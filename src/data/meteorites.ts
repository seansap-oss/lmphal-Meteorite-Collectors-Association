export type MeteoriteClass = 'Stony' | 'Iron' | 'Stony-Iron'
export type FallType = 'Observed Fall' | 'Found'

export interface Meteorite {
  id: string
  name: string
  classification: MeteoriteClass
  fallType: FallType
  year: number | string
  origin: string
  mass: string
  description: string
  image: string
  height: 'tall' | 'medium' | 'short'
  /** Additional classification detail for the background parallax title */
  subclass?: string
  /** Color accent for the card border/accent */
  accentColor: string
}

export const meteorites: Meteorite[] = [
  {
    id: 'sikhote-alin',
    name: 'Sikhote-Alin',
    classification: 'Iron',
    fallType: 'Observed Fall',
    year: 1947,
    origin: 'Primorsky Krai, Russia',
    mass: '23 tonnes (total)',
    description:
      'The largest witnessed meteorite fall in recorded history. This massive iron meteorite produced a spectacular fireball seen over 300 km away, scattering thousands of fragments across the Sikhote-Alin mountains.',
    image: 'https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=600&h=800&fit=crop',
    height: 'tall',
    subclass: 'IIAB',
    accentColor: '#8C7A6B',
  },
  {
    id: 'willamette',
    name: 'Willamette',
    classification: 'Iron',
    fallType: 'Found',
    year: 1902,
    origin: 'Oregon, United States',
    mass: '15.5 tonnes',
    description:
      'The largest meteorite ever found in the United States. Its distinctive cavities and regmaglypts tell the story of atmospheric entry and centuries of terrestrial weathering in the Pacific Northwest.',
    image: 'https://images.unsplash.com/photo-1518640467707-6811f4a6ab73?w=600&h=500&fit=crop',
    height: 'medium',
    subclass: 'IIIAB',
    accentColor: '#6B5B4E',
  },
  {
    id: 'allende',
    name: 'Allende',
    classification: 'Stony',
    fallType: 'Observed Fall',
    year: 1969,
    origin: 'Chihuahua, Mexico',
    mass: '2 tonnes (total)',
    description:
      'Falling during the Apollo program preparations, Allende is the most studied meteorite in history. Its carbonaceous chondrite composition contains presolar grains older than our Sun.',
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600&h=700&fit=crop',
    height: 'medium',
    subclass: 'CV3',
    accentColor: '#7A6B5E',
  },
  {
    id: 'esquel',
    name: 'Esquel',
    classification: 'Stony-Iron',
    fallType: 'Found',
    year: 1951,
    origin: 'Chubut, Argentina',
    mass: '755 kg',
    description:
      'Widely regarded as one of the most beautiful meteorites ever discovered. Esquel\'s pallasite structure reveals stunning translucent olivine crystals embedded in a nickel-iron matrix.',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=600&fit=crop',
    height: 'medium',
    subclass: 'Pallasite',
    accentColor: '#9C8A6E',
  },
  {
    id: 'campo-del-cielo',
    name: 'Campo del Cielo',
    classification: 'Iron',
    fallType: 'Found',
    year: 1576,
    origin: 'Chaco, Argentina',
    mass: '60 tonnes (total)',
    description:
      'Originating from an asteroid impact 4,000 years ago, the Campo del Cielo field spans 3×18 km. Individual specimens are prized for their dramatic regmaglypts and Widmanstätten patterns.',
    image: 'https://images.unsplash.com/photo-1502134249126-9f3755a50d78?w=600&h=900&fit=crop',
    height: 'tall',
    subclass: 'IAB',
    accentColor: '#7D6E60',
  },
  {
    id: 'murchison',
    name: 'Murchison',
    classification: 'Stony',
    fallType: 'Observed Fall',
    year: 1969,
    origin: 'Victoria, Australia',
    mass: '100 kg (total)',
    description:
      'This carbonaceous chondrite contains over 90 amino acids, including some not found on Earth. It provides compelling evidence for the extraterrestrial origins of life\'s building blocks.',
    image: 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=600&h=750&fit=crop',
    height: 'medium',
    subclass: 'CM2',
    accentColor: '#8B7D6C',
  },
  {
    id: 'hoba',
    name: 'Hoba',
    classification: 'Iron',
    fallType: 'Found',
    year: 1920,
    origin: 'Otjozondjupa, Namibia',
    mass: '60 tonnes',
    description:
      'The largest known meteorite on Earth and the heaviest naturally occurring iron mass. Its flat shape caused it to land without creating a significant crater, preserving it for millennia.',
    image: 'https://images.unsplash.com/photo-1504333638930-c8787321eee0?w=600&h=500&fit=crop',
    height: 'short',
    subclass: 'IVB',
    accentColor: '#6E6358',
  },
  {
    id: 'brenham',
    name: 'Brenham',
    classification: 'Stony-Iron',
    fallType: 'Found',
    year: 1882,
    origin: 'Kansas, United States',
    mass: '4.3 tonnes (total)',
    description:
      'A legendary pallasite from the Great Plains of Kansas. The Brenham strewn field has yielded hundreds of specimens, some revealing spectacular olivine crystal windows when sliced thin.',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&h=850&fit=crop',
    height: 'tall',
    subclass: 'Pallasite',
    accentColor: '#A0906E',
  },
]

/** Community stats for the GroupSyncBanner */
export const communityStats = {
  activeHunters: 2847,
  verifiedFragments: 14203,
  researchPapers: 312,
  memberSince: 2019,
}
