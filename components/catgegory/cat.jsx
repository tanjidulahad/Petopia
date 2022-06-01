import Link from "@components/link"
import Router from 'next/router'
import { useState } from "react"
import MediaQuery from "react-responsive"
import { Button } from "@components/inputs"
import { useRouter } from "next/router"

const CatList = ({ title = "Categories", list = [], closeMenu, setSelectedCategory, ...props }) => {

    const router = useRouter()
    const data = (Router?.router?.state?.query)
    const [activeSubcategoryList, setActiveSubcategoryList] = useState([])
    const [activeSubcategory, setActiveSubcategory] = useState(false)
    // alert(category,SubCategoryId)
    const [active, setactive] = useState({
        activeid: "",
        activesubcategory: {
            name: "",
            active: true
        },
        active: true
    })

    const activeHandler = (item) => {
        setSelectedCategory(item.category_name || '')
        setactive({ ...active, activeid: item.category_id, active: active.activeid == item.category_id ? !active.active : true })
    }
    const subHandler = (item) => {
        setactive({
            ...active, activesubcategory: {
                name: item.sub_category_id,
                active: !active.activesubcategory.active
            },
        })
    }
    const { category: activeId, subCategoryId } = router.query
    const goToList = () => {
        if (window) {
            // window.scrollBy(0, 400)
        }
    }
    const breackPoint = 768
    return (
        <div className="box-container categories w-full h-full ">
            {/* For desktop */}
            <MediaQuery minWidth={breackPoint}>
                <div className="text-left sticky top-0 bg-white">
                    <span className=" text-center black-color font-extrabold text-xl sticky top-0">{title}</span>
                </div>
                <ul className="ul-list">
                    <li className={`${'active'} `} onClick={closeMenu}>
                        <Link href={`/`}>
                            <a >
                                <div className={`text-left py-1 mt-3 cursor-pointer ${!router.query.category ? 'cat-active btn-color-revers font-semibold' : 'black-color-75'}`} onClick={() => setSelectedCategory('All Items')}>
                                    <span className=" text-lg ">All Items</span>
                                    {/* <span className="font-16 font-w-400 dark-blue-50">22</span> */}
                                </div>

                            </a>
                        </Link>
                    </li>
                    {
                        list && list.map((item, i) => (
                            <li className={` font-regular `} key={i}>

                                <Link href={`/?category=${item.category_id}`}>
                                    <a>
                                        <div className={`text-left flex py-1 mt-3 cursor-pointer ${parseInt(data?.category, 10) === item.category_id ? 'btn-color-revers cat-active font-semibold' : 'font-medium black-color-75'}`} onClick={() => { activeHandler(item) }}>
                                            <span className={` text-base  `} >{item.category_name}</span>
                                            {/* <span className="font-16 font-w-400 dark-blue-50">22</span> */}
                                        </div>
                                    </a>
                                </Link>
                                {
                                    active.activeid === item.category_id && active.active &&
                                    <ul className="ul-list pl-6">
                                        {
                                            item.subcategories.map((subitem, i) => (
                                                <li key={i}>
                                                    <Link href={`/?category=${item.category_id}&subCategoryId=${subitem.sub_category_id}`}>
                                                        <a>
                                                            <div className="flex flex-col justify-content-center mt-3 cursor-pointer " >
                                                                <span className={` text-base  ${parseInt(data?.subCategoryId, 10) === subitem.sub_category_id ? 'font-semibold btn-color-revers' : 'font-medium black-color-75'}`} onClick={() => { subHandler(subitem) }} >{subitem.sub_category_name}</span>
                                                            </div>
                                                        </a>
                                                    </Link>
                                                </li>))
                                        }
                                    </ul>
                                }
                            </li>
                        ))
                    }
                </ul>
            </MediaQuery>
            {/* For Mobile only */}
            <MediaQuery maxWidth={breackPoint}>
                <div className="mob-cat relative w-full mt-3 py-4 border-b-2">
                    <div className="w-full flex overflow-auto space-x-3 no-scrollbar  sticky top-0 -mb-5">
                        <div className={`inline-block py-3 rounded px-3 shrink-0 h-fit w-fit ${!activeId && 'active font-semibold'}`} onClick={goToList}>
                            <Button className=" text-base  " type="link" href={`/`} >All Items</Button>
                        </div>
                        {
                            list && list?.map((item, i) => (<>
                                <div className={`inline-block  py-3 rounded px-3 shrink-0 h-fit w-fit ${item.category_id == activeId && 'active border-b-4 font-semibold'}`} onClick={() => {
                                    goToList();
                                    setActiveSubcategoryList(item.subcategories);
                                    setActiveSubcategory(
                                        item.category_id == activeId ? !activeSubcategory : true
                                    )
                                }} key={i}>
                                    <Button className="text-base  " type="link" href={`/?category=${item.category_id}`} >{item.category_name}</Button>
                                </div>
                            </>))
                        }
                    </div>
                    {
                        !!activeSubcategoryList.length && activeSubcategory &&
                        <div className=" mob-sub-cat absolute top-[75px] inset-x-0 h-50 overflow-y-auto shadow-xl bg-white rounded-sm  py-6 active border-b-4" >
                            <span className="block sticky -top-4 mr-auto cursor-pointer" onClick={() => { setActiveSubcategory(false) }} >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-auto mr-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </span>
                            {
                                <ul className="ul-list px-6 space-y-4 ">
                                    {
                                        activeSubcategoryList.map((subitem, i) => (
                                            <li key={i}>
                                                <Link href={`/?category=${activeId}&subCategoryId=${subitem.sub_category_id}`}>
                                                    <a>
                                                        <div className={`flex flex-col justify-content-center cursor-pointer `}>
                                                            <span className={` text-base font-semibold ${subCategoryId == subitem.sub_category_id && 'btn-color-revers'}`} onClick={() => { subHandler(subitem); setActiveSubcategory(false) }} >{subitem.sub_category_name}</span>
                                                        </div>
                                                    </a>
                                                </Link>
                                            </li>))
                                    }
                                </ul>
                            }
                        </div>
                    }
                </div>
            </MediaQuery>
        </div>
    )
}

export default CatList
