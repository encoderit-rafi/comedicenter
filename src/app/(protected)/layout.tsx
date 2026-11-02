interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="relative ">
      <main>{children}</main>
    </div>
  );
}
