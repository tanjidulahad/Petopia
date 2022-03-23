import { useEffect, useState } from 'react';
import { Container, FooterP, FooterImage } from './styled'

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
      });
      objerver.observe(document.body)
    }
  }, [])
  return (
    <footer style={{
      paddingBottom: mobNavHeight
    }}>
      <div style={{ background: '#111111 0% 0% no-repeat padding-box' }} className="w-full bg-dark-900">
        <Container className="mx-32 " >
          <div className="border-b-2 border-gray-800 h-1/3  flex flex-row justify-center  align-center">
            <FooterP>Privacy Policy</FooterP>
            <BsDot className="mx-4 mt-8" color={'gray'} size={20} />
            <FooterP>Privacy Policy</FooterP>
            <BsDot className="mx-4 mt-8" color={'gray'} size={20} />
            <FooterP>Privacy Policy</FooterP>
          </div>
          <div className=" h-1/3 mt-10 flex  justify-center  align-center">
            <div>
              <FooterP>Online Store Created Using</FooterP>
              <FooterImage
                src={'https://www.goplinto.com/assets/images/goplinto-logo-white-480x97.png'}
                alt="Picture of the author"
              />
            </div>
          </div>
        </Container>
      </div>

    </footer>
  )
}

export default index
