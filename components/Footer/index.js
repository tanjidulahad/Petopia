import React from 'react'
import { Container, FooterP, FooterImage } from './styled'

import { BsDot } from 'react-icons/bs'
function index() {
  return (
    <div style={{ background: '#111111 0% 0% no-repeat padding-box' }} className="w-full bg-dark-900">
      <Container className="mx-32 " >
        <div className="border-b-2 border-gray-800 h-1/3 mt-2 flex flex-row justify-center  align-center">
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
  )
}

export default index