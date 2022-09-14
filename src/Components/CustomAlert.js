const CustomAlert = ({children}) => {
  return (
    <div className="custom-alert">The following event(s) have an invalid start or end time : {children}</div>
  )
}


export default CustomAlert
