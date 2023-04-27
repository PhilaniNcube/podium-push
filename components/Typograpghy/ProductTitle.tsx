const ProductTitle = ({title}:{title:string}) => {
  return (
    <h1 className="text-slate-800 font-extrabold tracking-wider text-4xl md:text-5xl">
      {title}
    </h1>
  );
};
export default ProductTitle;
