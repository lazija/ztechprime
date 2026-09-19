import { spawn } from 'node:child_process'
import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { homedir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const wanted = readFileSync(join(root, '.nvmrc'), 'utf8').trim()
const major = Number(process.versions.node.split('.')[0])

function nvmNodeDir(version) {
  const base = join(homedir(), '.nvm/versions/node')
  if (!existsSync(base)) return null
  const exact = join(base, version.startsWith('v') ? version : `v${version}`)
  if (existsSync(join(exact, 'bin/node'))) return exact
  const prefix = version.startsWith('v') ? version : `v${version}`
  const match = readdirSync(base)
    .filter((name) => name === prefix || name.startsWith(`${prefix}.`))
    .sort()
    .at(-1)
  return match ? join(base, match) : null
}

let nodeDir = null
if (major < 22) {
  nodeDir = nvmNodeDir(wanted) ?? nvmNodeDir('26') ?? nvmNodeDir('22')
  if (!nodeDir) {
    console.error(
      `ztechprime needs Node 22+ to start Vite (and /api/contact). This shell is ${process.version}. Run: nvm use`,
    )
    process.exit(1)
  }
}

const env = { ...process.env }
if (nodeDir) {
  env.PATH = `${join(nodeDir, 'bin')}:${env.PATH}`
}

const vite = join(root, 'node_modules/vite/bin/vite.js')
const child = spawn(nodeDir ? join(nodeDir, 'bin/node') : process.execPath, [vite], {
  stdio: 'inherit',
  env,
  cwd: root,
})

child.on('exit', (code, signal) => {
  if (signal) process.kill(process.pid, signal)
  process.exit(code ?? 1)
})
