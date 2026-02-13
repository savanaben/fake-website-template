/**
 * NAEP design tokens for reference and use across components.
 * Use these instead of raw Tailwind where applicable.
 */

import {
  gray,
  mauve,
  slate,
  sage,
  olive,
  sand,
  tomato,
  red,
  ruby,
  crimson,
  pink,
  plum,
  purple,
  violet,
  iris,
  indigo,
  blue as radixBlue,
  cyan,
  teal,
  jade,
  green,
  grass,
  brown,
  orange,
  amber,
  yellow as radixYellow,
  lime,
  mint,
  sky,
} from '@radix-ui/colors'

/** Spacing (px) */
export const NAEP_SPACING = {
  'space-0': 0,
  'space-4': 4,
  'space-8': 8,
  'space-12': 12,
  'space-16': 16,
  'space-24': 24,
  'space-32': 32,
  'space-48': 48,
  'space-64': 64,
  'space-128': 128,
  'space-256': 256,
} as const

export type NAEP_SPACING_KEY = keyof typeof NAEP_SPACING

export const NAEP_SPACING_KEYS: NAEP_SPACING_KEY[] = [
  'space-0',
  'space-4',
  'space-8',
  'space-12',
  'space-16',
  'space-24',
  'space-32',
  'space-48',
  'space-64',
  'space-128',
  'space-256',
]

/** Shadows */
export const NAEP_SHADOWS = {
  md: '0 2px 3px rgba(0,0,0,.25)',
  lg: '0 3px 4px rgba(0,0,0,.25)',
} as const

/** Border radius (px) */
export const NAEP_BORDER_RADIUS = {
  sm: 2,
  md: 4,
  lg: 6,
} as const

/** Light background color palette (name -> hex) */
export const NAEP_LIGHT_BACKGROUNDS: Record<string, string> = {
  Gray: '#EAEAEA',
  Mauve: '#ECE7EF',
  Slate: '#EBEBF1',
  Sage: '#E4EDEA',
  Olive: '#E5EDE5',
  Sand: '#EDE9E6',
  Tomato: '#FBE4E0',
  Red: '#FBE4E5',
  Ruby: '#FBE3E6',
  Crimson: '#FCE2EA',
  Pink: '#FBE2F0',
  Plum: '#F6E1F6',
  Purple: '#F1E3F8',
  Violet: '#ECE6F8',
  Iris: '#E9EAFB',
  Indigo: '#E3EAF8',
  Blue: '#DFEFFB',
  Cyan: '#D7F4F7',
  Teal: '#D3F4ED',
  Jade: '#D9F3E4',
  Green: '#DCF2E3',
  Grass: '#DDF2DD',
  Brown: '#F4E9E0',
  Orange: '#F7E9CD',
  Amber: '#F3EDCB',
  Yellow: '#F3EEBD',
  Lime: '#E7F2CA',
  Mint: '#D3F5EA',
  Sky: '#DAF2FA',
}

/** Border colors for NAEP custom (light) backgrounds – Radix scale step 7. Keys match NAEP_LIGHT_BACKGROUNDS. */
export const NAEP_BORDER_COLORS: Record<string, string> = {
  Gray: gray.gray7,
  Mauve: mauve.mauve7,
  Slate: slate.slate7,
  Sage: sage.sage7,
  Olive: olive.olive7,
  Sand: sand.sand7,
  Tomato: tomato.tomato7,
  Red: red.red7,
  Ruby: ruby.ruby7,
  Crimson: crimson.crimson7,
  Pink: pink.pink7,
  Plum: plum.plum7,
  Purple: purple.purple7,
  Violet: violet.violet7,
  Iris: iris.iris7,
  Indigo: indigo.indigo7,
  Blue: radixBlue.blue7,
  Cyan: cyan.cyan7,
  Teal: teal.teal7,
  Jade: jade.jade7,
  Green: green.green7,
  Grass: grass.grass7,
  Brown: brown.brown7,
  Orange: orange.orange7,
  Amber: amber.amber7,
  Yellow: radixYellow.yellow7,
  Lime: lime.lime7,
  Mint: mint.mint7,
  Sky: sky.sky7,
}
