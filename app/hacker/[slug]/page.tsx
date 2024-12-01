const HackathonPage = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  return <div className="flex flex-col">{slug}</div>;
};

export default HackathonPage;
