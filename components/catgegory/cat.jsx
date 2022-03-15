import Link from "next/link"
import Router from 'next/router'
import { useState } from "react"

const style = {
    active: {
        background: `transparent linear-gradient(90deg, #D85A5A00 0%, #D85A5A40 100%) 0% 0% no-repeat padding-box`,
        opacity: 1,
        fontSize: `1rem`, /* 16px */
        lineHeight: `1.5rem`
    },
    subactive: {
        color: `#D85A5A`,
    }
}
const CatList = ({ title = "Categories", list = [], closeMenu, ...props }) => {
    // const { category, subCategoryId } = Router.router.query
    const [active, setactive] = useState({
        activeid: "",
        activesubcategory: {
            name: "",
            active: false
        },
        active: false
    })

    const activeHandler = (item) => {
        setactive({ ...active, activeid: item.category_id, active: !active.active })
    }
    const subHandler = (item) => {
        setactive({
            ...active, activesubcategory: {
                name: item.sub_category_id,
                active: !active.activesubcategory.active
            },
        })
    }
    return (
        <div className="box-container categories  h-full ">
            <div className="text-left mt-12">
                <span className=" text-center text-gray-800 font-extrabold  text-xl mt-12">{title}</span>
            </div>
            <ul className="ul-list ">
                <li className={`${'active'}`} onClick={closeMenu}>
                    <Link href={`/`}>
                        <div className="text-left mt-4 ">
                            <span className="  text-lg font-medium text-gray-600 ">All Products</span>
                            {/* <span className="font-16 font-w-400 dark-blue-50">22</span> */}
                        </div>
                    </Link>
                </li>
                {
                    list && list.map((item) => (
                        <li className={`font-w-400 `}>

                            <Link href={`/?category=${item.category_id}`}>
                                {active.activeid === item.category_id && active.active ?

                                    <div className=" text-center flex mt-4  cursor-pointer " style={style.active} onClick={() => { activeHandler(item) }} >
                                        <span className={` text-base font-medium text-gray-600  `} >{item.category_name}</span>
                                        {/* <span className="font-16 font-w-400 dark-blue-50">22</span> */}
                                    </div>
                                    :
                                    <div className=" text-center flex mt-4  cursor-pointer " onClick={() => { activeHandler(item) }} >
                                        <span className={` text-base font-medium text-gray-600  `} >{item.category_name}</span>
                                        {/* <span className="font-16 font-w-400 dark-blue-50">22</span> */}
                                    </div>
                                }
                            </Link>
                            {
                                active.activeid === item.category_id && active.active &&
                                <ul className="ul-list " style={{ paddingLeft: '8px' }}>
                                    {
                                        item.subcategories.map((subitem, i) => (
                                            <li >
                                                <Link href={`/?category=${item.category_id}&subCategoryId=${subitem.sub_category_id}`}>
                                                    {active.activesubcategory.name === subitem.sub_category_id && active.activesubcategory.active ?

                                                        <div className="flex flex-col justify-content-center mt-4 cursor-pointer " >
                                                            <span className={` text-base font-medium text-gray-600  `} style={style.subactive} onClick={() => { subHandler(subitem) }} >{subitem.sub_category_name}</span>

                                                        </div>
                                                        :
                                                        <div className="flex flex-col justify-content-center mt-4 cursor-pointer ">
                                                            <span className={` text-base font-medium text-gray-600  `} onClick={() => { subHandler(subitem) }} >{subitem.sub_category_name}</span>

                                                        </div>
                                                    }
                                                </Link>
                                            </li>))
                                    }
                                </ul>
                            }
                        </li>
                    ))
                    // list?.map((item) => (
                    //     <li key={item.category_id} onClick={closeMenu} className={`font-w-400 ${category == item.category_id && 'active'}`}>

                    //    <Link href={`/?category=${item.category_id}`}>
                    //       <Link>
                    //           <div className=" text-center flex mt-4  ">
                    //               <span className=" text-lg font-medium text-gray-600  active:text-blue-600 ">{item.category_name}</span>
                    //               {/* <span className="font-16 font-w-400 dark-blue-50">22</span> */}
                    //           </div>
                    //       </Link>
                    //   </Link>
                    //   <ul className="ul-list " style={{ paddingLeft: '8px' }}>
                    //       {
                    //           item.subcategories.map((subitem, i) => (
                    //               <li >
                    //                   <Link href={`/?category=${item.category_id}&subCategoryId=${subitem.sub_category_id}`}>
                    //                       <Link>
                    //                           <div className="flex flex-col justify-content-center mt-4">
                    //                               <span className={` text-lg font-medium text-gray-600  `} >{subitem.sub_category_name}</span>

                    //                           </div>
                    //                       </Link>
                    //                   </Link>
                    //               </li>
                    //           ))
                    //       }
                    //   </ul>
                    //     </li>

                    // ))
                }
            </ul>
        </div>
    )
}

export default CatList