import React, { useState } from "react";
import { GeneratePodcastProps } from "./types";
import { Textarea } from "./textarea";
import { Label } from "@radix-ui/react-label";
import { Button } from "./button";
import { Loader } from "lucide-react";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";
import { v4 as uuidv4 } from "uuid";
import { generateUploadUrl } from "@/convex/files";
import { useUploadFiles } from "@xixixao/uploadstuff/react";

const useGeneratePodcast = async ({
  setAudio,
  voicePrompt,
  voiceType,
  setAudioStorageId,
}: GeneratePodcastProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const { startUpload } = useUploadFiles(generateUploadUrl);
  const getPodcastAudio = useAction(api.openai.generateAudioAction);

  const generatePodcast = async () => {
    setIsGenerating(true);
    setAudio(" ");
  };

  if (!voicePrompt) {
    //toast({
    //title: "Please provide a voiceType to generate a podcast",
    //})
    return setIsGenerating(false);
  }

  try {
    const response = await getPodcastAudio({
      voice: voiceType,
      input: voicePrompt,
    });

    const blob = new Blob([response], { type: "audio/mpeg" });
    const fileName = `podcast-${uuidv4()}.mp3`;
    const file = new File([blob], fileName, { type: "audio/mpeg" });

    //const uploaded = await startUpload([file]);
    //const storageId = (uploaded[0].response as any).storageId;

    //setAudioStorageId(storageId);

    //const audioUrl = await getAudioUrl({ storageId });
    //setAudio(audioUrl!);
    setIsGenerating(false);
    //toast({
    //title: "Podcast generated successfully",
    //})
  } catch (error) {
    console.log("Error generating podcast", error);
    //toast({
    //title: "Error creating a podcast",
    //variant: 'destructive',
    //})
    setIsGenerating(false);
  }
};

const GeneratePodcast = (props: GeneratePodcastProps) => {
  const { isGenerating, generatePodcast } = useGeneratePodcast(props);

  return (
    <div>
      <div>
        <Label className="text-16 font-bold text-white-1">
          AI Prompt to generate a podcast
        </Label>
        <Textarea
          className="input-class font-light focus-visible:ring-offset-orange-1"
          placeholder="Provide text to generate audio"
          rows={5}
          value={props.voicePrompt}
          onChange={(e) => props.setVoicePrompt(e.target.value)}
        />
      </div>

      <div className="mt-5 w-full max-w-[200px]">
        <Button
          type="submit"
          className="text-16 bg-orange-1 py-4 font-bold text-white-1"
        >
          {isGenerating ? (
            <>
              Generating...
              <Loader size={20} className="animate-spin ml-2" />
            </>
          ) : (
            "Generate"
          )}
        </Button>
      </div>
      {props.audio && (
        <audio
          controls
          src={props.audio}
          autoPlay
          className="mt-5"
          onLoadedMetadata={(e) =>
            props.setAudioDuration(e.currentTarget.duration)
          }
        />
      )}
    </div>
  );
};

export default GeneratePodcast;
function getPodcastAudio(arg0: { voice: string }) {
  throw new Error("Function not implemented.");
}
