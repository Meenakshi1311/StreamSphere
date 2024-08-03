import React from "react";

const PodcastDeatils = ({ params }: { params: { podcastId: string } }) => {
  return <p className="text-white-1">Podcast Details for {params.podcastId}</p>;
};

export default PodcastDeatils;
