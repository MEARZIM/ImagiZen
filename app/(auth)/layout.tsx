const Authlayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className="">
        <div className="h-[100vh] flex justify-center items-center">
          {children}
        </div>
      </div>
    </>
  )
}

export default Authlayout