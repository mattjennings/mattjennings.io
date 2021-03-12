import { useEffect, useLayoutEffect } from 'react'

/**
 * SSR-safe useLayoutEffect
 */
const useIsoLayoutEffect = process.browser ? useLayoutEffect : useEffect

export default useIsoLayoutEffect
