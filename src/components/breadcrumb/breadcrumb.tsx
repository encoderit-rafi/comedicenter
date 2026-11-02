import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between bg-[#34373C]">
      <div className="container">
        <nav>
          <ol className="flex items-center gap-2 p-2">
            {items.map((item, index) => (
              <li key={index} className="flex items-center">
                {item.href ? (
                  <Link className="font-medium text-white" href={item.href}>
                    {item.label}
                  </Link>
                ) : (
                  <span className="font-medium text-primary text-[#87C2FF]">{item.label}</span>
                )}
                {index < items.length - 1 && (
                  <span className="mx-2">
                    <svg width="7" height="13" viewBox="0 0 7 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M1 1L6 6.5L1 12"
                        stroke="white"
                        strokeOpacity="0.56"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumb;
