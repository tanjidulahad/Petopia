import { useEffect, useState } from 'react'


import { BsDot } from 'react-icons/bs'
function index() {
  const [mobNavHeight, setMobNavHeight] = useState(0)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const objerver = new ResizeObserver(function (e) {
        if (e[0].contentRect.width < 640 && mobNavHeight == 0) {
          const ele = document.getElementById('mob-navbar')
          const ele2 = document.getElementById('cart-total-btn') || false
          let totalH = mobNavHeight
          if (!!ele) {
            if (ele.offsetHeight != totalH) {
              totalH = ele.offsetHeight
            }
          }
          if (!!ele2) {
            if (ele2.offsetHeight != mobNavHeight) {
              totalH += ele2.offsetHeight
            }
          }
          setMobNavHeight(totalH)
        } else {
          setMobNavHeight(0)
        }
      })
      objerver.observe(document.body)
    }
  }, [])
  return (
    <footer
      style={{
        paddingBottom: mobNavHeight,
      }}
    >
      <div
        style={{ background: '#111111 0% 0% no-repeat padding-box' }}
        className="w-full bg-dark-900"
      >
        <div
          className="mx-32 "
          style={{
            height: '262px',

            background: '#111111 0% 0% no-repeat padding-box',
            opacity: 1,
          }}
        >
          <div
            className="border-b-2 border-gray-800 h-1/3  flex flex-row   justify-center "
            style={{ alignItems: 'center' }}
          >
            <p className="text-gray-400 my-8">Privacy Policy</p>
            <BsDot className="mx-4 my-8 " color={'gray'} size={20} />
            <p className="text-gray-400 my-8 ">Privacy Policy</p>

            <BsDot className="mx-4 my-8" color={'gray'} size={20} />
            <p className="text-gray-400 my-8  ">Privacy Policy</p>
          </div>
          <div className=" h-1/3 mt-10 flex  justify-center  align-center">
            <div>
              <p className="text-gray-400 flex justify-center ml-10    ">
                Online Store Created Using
              </p>

              <div className="flex justify-center ">
                <img
                  src={
                    'https://www.goplinto.com/assets/images/goplinto-logo-white-480x97.png'
                  }
                  alt="Picture of the author"
                  className="w-1/4 my-2 mr-11"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default index
