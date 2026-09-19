import { CONTACT_EMAIL } from './assets/brand'

export const INQUIRY_EMAIL = CONTACT_EMAIL

export const chapters = [
  {
    id: 'arrive',
    kicker: 'Ztechprime',
    title: 'Bring the strain. We’ll hold the stack.',
    body: 'Smart IT Solutions from ztech solutions. IT, programming, and SaaS consultation in one conversation — so the floor, the product, and the model stay in the same room.',
  },
  {
    id: 'strain',
    kicker: 'The sequence',
    title: 'Software rarely fails at launch.',
    body: 'It fails when the next ten customers arrive. Infrastructure is patched. The product is rewritten. The SaaS idea is sold before the architecture can hold it. Ztechprime exists so ztech solutions can hold those conversations in one room.',
  },
  {
    id: 'it',
    kicker: 'IT',
    title: 'The floor has to hold.',
    body: 'Cloud, identity, networks, and operations designed so the next incident is boring. We treat infrastructure as product: observable, documented, and quiet enough for the team to think.',
  },
  {
    id: 'code',
    kicker: 'Programming',
    title: 'Software with a spine.',
    body: 'Custom platforms, integrations, and product code written for the operating model you actually run — not a demo that dies in month four. We ship the version you can staff, extend, and explain.',
  },
  {
    id: 'saas',
    kicker: 'SaaS consultation',
    title: 'Decide the shape before you scale it.',
    body: 'Packaging, tenancy, billing edges, and the architecture that keeps a product fundable. We help operators choose what to build, what to buy, and what to leave on the floor.',
  },
] as const
