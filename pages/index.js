import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Loader from "@components/loading/loader"
import DefaultComponent from '@components/indexDefault/index-dtault';

export default function name() {
    const router = useRouter()
    const [readyToGo, setReadyToGo] = useState(false)
    const [storeId, setStoreId] = useState(null)
    console.log(router);
    useEffect(() => {
        const { storeId } = router.query
        if (storeId) {
            setStoreId(storeId)
            setReadyToGo(true)
        }
    }, [router.isReady])

    return (
        <>
            {router.isReady ?
                readyToGo ?
                    <Loader message="Store is getting ready for you!..." />
                    :
                    !!storeId ?
                        <Loader message="Store is getting ready for you!..." />
                        :
                        <DefaultComponent />
                :
                <Loader />
            }
        </>
    )
}
