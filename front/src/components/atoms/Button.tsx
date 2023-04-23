type Props = {
  content : string;
};

const Button = ({content}: Props) => {
  return(
    <>
      <button className={
        'm-20 p-20 bg-bg-primary shadow-lg hover:bg-bg-secondary hover:shadow-none'
      }>
        {content}
      </button>
    </>
  )
}
export default Button