import React, { useState, useEffect, Suspense } from "react"
import { useRouter } from "next/router"
import dynamic from "next/dynamic"
import Loader from "@components/loading/loader"
// import DefaultComponent from '@components/indexDefault/index-dtault';

export default function name() {
    const router = useRouter()
    const [readyToGo, setReadyToGo] = useState(false)
    const [storeId, setStoreId] = useState(null)

    const DefaultComponent = dynamic(() => import('@components/indexDefault/index-dtault'), {
        // suspense: true,
        loading: () => <Loader />
    })
    useEffect(() => {
        const { storeId } = router.query
        if (storeId) {
            setStoreId(storeId)
            setReadyToGo(true)
            router.push(router.asPath)
        }
    }, [router.isReady])

    return (
        <>
            {
                router.isReady ?
                    readyToGo ?
                        <Loader message="Store is getting ready for you!..." />
                        :
                        <Suspense fallback={<Loader></Loader>}>
                            <DefaultComponent />
                        </Suspense>
                    :
                    <Loader />
            }
        </>
    )
}
