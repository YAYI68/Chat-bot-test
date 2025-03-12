import Image from "next/image";
const headerToUrl = {
    logo: require('./assets/logo.png')
}

export function Header(){

    return <header className="w-full bg-white hidden lg:flex shadow-md items-center p-4">
        <div className="size-[3rem] relative rounded-md ">
          <Image src={headerToUrl.logo} alt="chatbot logo" fill className="h-full w-full object-cover"  />
        </div>
    </header>
}