import { useRef, useEffect } from 'react'
import type { MutableRefObject } from 'react'
// return isMounted.current true when the component is still mounted.
// return isMounted.current false when the component is unmounted.

const useIsMountedRef = (): MutableRefObject<boolean> => {
	const isMounted = useRef(true)

	useEffect(
		() => () => {
			isMounted.current = false
		},
		[]
	)

	return isMounted
}

export default useIsMountedRef
