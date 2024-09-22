"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import GeneratePodcast from "@/components/ui/GeneratePodcast";
import GenerateThumbnail from "@/components/ui/GenerateThumbnail";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Loader } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
import { Textarea } from "@/components/ui/textarea";

const voiceCategories = ["Alloy", "Shimmer", "Nova", "Echo", "Fable", "Onyx"];

const formSchema = z.object({
  podcastTitle: z.string().min(2),
  podcastDescription: z.string().min(2),
});

const CreatePodcast = () => {
  const [voicePrompt, setVoicePrompt] = useState("");
  const [voiceType, setVoiceType] = useState<string | null>(null);

  const [imagePrompt, seImagePrompt] = useState("");
  const [imageStorageId, setImageStorageId] = useState<Id<"_storage"> | null>(
    null
  );
  const [imageUrl, seImageUrl] = useState("");

  const [audioStorageId, setAudioStorageId] = useState<Id<"_storage"> | null>(
    null
  );
  const [audioUrl, setAudioUrl] = useState("");
  const [audioDuration, setAudioDuration] = useState(0);

  const [isSubmitting, setSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      podcastTitle: "",
      podcastDescription: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <section className="mt-10 flex flex-col">
      <h1 className="text-20 font-bold text-white-1">Create Podcasts</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-12 flex w-full flex-col"
        >
          <div className="flexflex-col gap-[30px] border-b border-black-5 pb-10">
            <FormField
              control={form.control}
              name="PodcastTitle"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="text-16 font-bold text-white-1">
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="input-class focus-visible:ring-offset-orange-1"
                      placeholder="Mind Relaxing Podcast"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-white-1" />
                </FormItem>
              )}
            />
          </div>
        </form>
        <div className="flex flex-col gap-2.5">
          <Label className="text-16 font-bold text-white-1">
            Select Your AI Voice
          </Label>

          <Select onValueChange={(value) => setVoiceType(value)}>
            {" "}
            <SelectTrigger
              className={cn(
                "text-16 w-full border-none bg-black-1 text-gray-1 focus-visible:ring-offset-orange-1"
              )}
            >
              <SelectValue
                placeholder="Select AI Voice"
                className="placeholder:text-gray-1"
              />
            </SelectTrigger>
            <SelectContent className="text-q6 border-none bg-black-1 font-bold text-white-1 focus-visible:ring-offset-orange-1">
              {voiceCategories.map((category) => (
                <SelectItem
                  key={category}
                  value={category}
                  className="capitalize focus:bg-orange-1"
                >
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
            {voiceType && (
              <audio src="{'/${voiceType}'}" autoPlay className="hidden" />
            )}
          </Select>
        </div>

        <div>
          <FormField
            control={form.control}
            name="podcastDescription"
            render={({ field }) => (
              <FormItem className="flex flex-col gap-2.5">
                <FormLabel className="text-16 font-bold text-white-1">
                  Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    className="input-class focus-visible:ring-offset-orange-1"
                    placeholder="Write a short description for the podcast."
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-white-1" />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col pt-10">
          <GeneratePodcast
            setAudioStorageId={setAudioStorageId}
            setAudio={setAudioUrl}
            voiceType={voiceType}
            audio={audioUrl}
            voicePrompt={voicePrompt}
            setVoicePrompt={setVoicePrompt}
            setAudioDuration={setAudioDuration}
          />

          <GenerateThumbnail />

          <div className="mt-10 w-full">
            <Button
              type="submit"
              className="text-16 w-full bg-orange-1 py-4 font-extrabold text-white-1 transition-all duration-500 hover:bg-black-1"
            >
              {isSubmitting ? (
                <>
                  Submitting...
                  <Loader size={20} className="animate-spin ml-2" />
                </>
              ) : (
                "Submit and Publish Podcast"
              )}
            </Button>
          </div>
        </div>
      </Form>
    </section>
  );
};

export default CreatePodcast;
