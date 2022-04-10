import { useState, useEffect } from "react"
import { useRouter } from "next/router"
import Loader from "@components/loading/loader"

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
                    <div className="flex justify-center items-center w-full query-page">
                        <p className="text-lg">Please add Store name and Store id in URL.</p>
                    </div>
                :
                <Loader />
            }
        </>
    )
}