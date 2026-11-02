import Image from "next/image"

export function Logo() {
  return <Image src="/img/logo.svg"
            alt="Logo"
            width={300}
            height={260}
            className="rounded-tl-sm rounded-tr-sm object-cover object-center"
            style={{ width: "auto", height: "auto" }}
            priority
         />
}

