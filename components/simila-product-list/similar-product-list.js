import Link from '@components/link';
import Carousel from 'react-elastic-carousel';

const LeftArrow = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">
        <g id="left" transform="translate(-80 -5533)">
            <circle id="Ellipse_403" dataname="Ellipse 403" cx="28" cy="28" r="28" transform="translate(80 5533)" fill="rgba(36,36,36,0.25)" />
            <path id="Path_3418" datavame="Path 3418" d="M1012.356,10295.25l-9,9,9,9" transform="translate(-900.356 -4743.25)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
        </g>
    </svg>
)


const RightArrow = () => (
    <svg id="right" xmlns="http://www.w3.org/2000/svg" width="56" height="56" viewBox="0 0 56 56">
        <circle id="Ellipse_403" dataname="Ellipse 403" cx="28" cy="28" r="28" fill="rgba(36,36,36,0.25)" />
        <path id="Path_3418" datavame="Path 3418" d="M1003.356,10295.249l8,8-8,8" transform="translate(-978.856 -10274.749)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
    </svg>
)
function myArrow({ type, onClick, isEdge }) {
    return (
        <>
            {
                type == 'PREV' ?
                    <button onClick={onClick} disabled={isEdge}>
                        <LeftArrow />
                    </button>
                    :
                    <button onClick={onClick} disabled={isEdge}>
                        <RightArrow />
                    </button>
            }
        </>
    )
}

const SimilaProductList = ({ list }) => {
    const breakPoints = [
        { width: 1, itemsToShow: 1 },
        { width: 640, itemsToShow: 2, itemsToScroll: 2 },
        { width: 768, itemsToShow: 3 },
        { width: 1024, itemsToShow: 4 },
        { width: 1280, itemsToShow: 5 },
        { width: 1536, itemsToShow: 5 },
        { width: 2000, itemsToShow: 6 },
    ];
    return (
        <Carousel le breakPoints={breakPoints} renderArrow={myArrow} disableArrowsOnEnd={true} >
            {
                list.map((item, i) => (
                    <div className="w-52 space-y-4" key={i}>
                        <Link href={`/product/${item.item_id}`}>
                            <a className="block w-52 h-52 mx-auto">
                                <img className="w-full h-full sm:w-40 sm:h-40 bg-slate-300 rounded-md  object-cover" src={`${item.primary_img || '/img/default.webp'}`} alt={`...`} />
                            </a>
                        </Link>
                        <a className='block'>
                            <h2 className="line-truncate-1 text-lg font-bold">{item.item_name}</h2>
                        </a>
                        <div className="flex">
                            <h2 className="text-lg font-bold">₹  {item.sale_price}</h2>
                        </div>
                        <div className=" space-x-2">
                            {
                                item.sale_price != item.price &&
                                <span className=" line-through text-gray-400 text-base">₹ {item.price}</span>
                            }
                            {
                                !!(item.price - item.sale_price) &&
                                <span className=" line-through text-green-400 text-sm">₹ {item.price - item.sale_price}</span>
                            }
                        </div>
                    </div>
                ))
            }

        </Carousel>
    )
}

export default SimilaProductList;
