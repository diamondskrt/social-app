import type { VariantProps } from 'class-variance-authority'
import type { HTMLAttributes } from 'vue'

import type { ButtonVariants } from '~/shared/ui'

import type {
  inputGroupAddonVariants,
  inputGroupButtonVariants,
} from '../config'

type InputGroupVariants = VariantProps<typeof inputGroupAddonVariants>

type InputGroupButtonVariants = VariantProps<typeof inputGroupButtonVariants>

type InputGroupButtonProps = {
  variant?: ButtonVariants['variant']
  size?: InputGroupButtonVariants['size']
  class?: HTMLAttributes['class']
}

export type {
  InputGroupVariants,
  InputGroupButtonVariants,
  InputGroupButtonProps,
}
