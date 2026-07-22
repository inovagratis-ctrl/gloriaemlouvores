const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY || "AIzaSyDKiaH4XDRmHP7CffH7fwLEO7os-_6jm60";
const CHANNEL_HANDLE = "gloriaemlouvores";

export default async function handler(req: any, res: any) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate");

  try {
    // Try channels endpoint directly with forHandle
    const channelsUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics&forHandle=@${CHANNEL_HANDLE}&key=${YOUTUBE_API_KEY}`;
    const channelsRes = await fetch(channelsUrl);
    const channelsData = await channelsRes.json();

    if (channelsData.items && channelsData.items.length > 0) {
      const stats = channelsData.items[0].statistics;
      return res.status(200).json({
        subscribers: parseInt(stats.subscriberCount || "0"),
        videos: parseInt(stats.videoCount || "0"),
        views: parseInt(stats.viewCount || "0"),
      });
    }

    return res.status(200).json({ subscribers: 1400, videos: 107, views: 6800 });
  } catch (error) {
    return res.status(200).json({ subscribers: 1400, videos: 107, views: 6800 });
  }
}
