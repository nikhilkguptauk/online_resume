export {}

type TurnstileRenderOptions = {
  sitekey: string
  size?: 'invisible' | 'compact' | 'normal'
  theme?: 'light' | 'dark'
  action?: string
  callback?: (token: string) => void
  'error-callback'?: () => void
  'expired-callback'?: () => void
}

type TurnstileApi = {
  ready: (callback: () => void) => void
  render: (container: HTMLElement | string, options: TurnstileRenderOptions) => string
  execute: (widgetId: string, options?: { action?: string }) => Promise<string> | string
  reset: (widgetId?: string) => void
}

declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}
