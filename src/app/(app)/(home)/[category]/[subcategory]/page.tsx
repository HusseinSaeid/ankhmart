interface Props {
  params: Promise<{
    category: string;
    subcategory: string;
  }>;
}
const page = async ({ params }: Props) => {
  const { category, subcategory } = await params;
  return (
    <div>
      Category: {category} <br />
      SubCategory: {subcategory}
    </div>
  );
};
export default page;
