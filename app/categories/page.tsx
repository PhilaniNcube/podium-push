const page = async ({params}:{params:{slug:string}}) => {

  return <main>{params.slug}</main>;
};
export default page;
