import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Loader from "@components/loading/loader"
import DefaultComponent from '@components/indexDefault/index-dtault';

export default function name() {
    const router = useRouter()
    const [storeId, setStoreId] = useState(false)
    console.log(router);
    useEffect(() => {
        const { storeId } = router.query
        if (storeId) {
            setStoreId(true)
        }
    }, [router.isReady])

    return (
        <>
            {router.isReady ?
                storeId ?
                    <Loader message="Store is getting ready for you!..." />
                    :
                    <DefaultComponent />
                :
                <Loader />
            }
        </>
    )
}
