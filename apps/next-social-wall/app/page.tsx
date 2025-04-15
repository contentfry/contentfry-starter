import SocialWall from "../components/social-wall";

async function getSocialData(feedUrl: string) {
  const res = await fetch(feedUrl);
  if (!res.ok) {
    // throw new Error("Failed to fetch social data");
    return {data: [] }    
  }
  return res.json();
}


export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ feedUrl?: string }>;
}) {
  const defaultFeedUrl =  'https://feed.contentfry.com/' + (['cats', 'auto', 'demo'][Math.floor(Math.random() * 3)])  
  const resolvedParams = await searchParams;
  const feedUrl = resolvedParams.feedUrl || defaultFeedUrl;
  const socialData = await getSocialData(feedUrl);

  return (
    <div className="min-h-screen bg-background">
      <SocialWall initialData={socialData} feedUrl={feedUrl} />
    </div>
  );
}