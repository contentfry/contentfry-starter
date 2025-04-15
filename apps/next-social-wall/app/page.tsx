import SocialWall from "../components/social-wall"

async function getSocialData(feedUrl: string) {
  const res = await fetch(feedUrl)
  if (!res.ok) {
    throw new Error('Failed to fetch social data')
  }
  return res.json()
}

export default async function Page({
  searchParams,
}: {
  searchParams: { feed?: string }
}) {
  const feedUrl = searchParams.feedUrl || 'https://feed.contentfry.com/cats'
  const socialData = await getSocialData(feedUrl)

  return (
    <div className="min-h-screen bg-background">
      <SocialWall initialData={socialData} feedUrl={feedUrl} />
    </div>
  )
}
