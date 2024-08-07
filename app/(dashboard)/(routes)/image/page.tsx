"use client"
import * as z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Download, ImageIcon } from 'lucide-react';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormItem,
  FormControl,
  FormField,
} from '@/components/ui/form';
import { toast } from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FiEdit } from "react-icons/fi";

import { formSchema, amountOptions, resolutionOptions } from "./constant"
import Heading from '@/components/layouts/Heading/Heading'
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader } from "@/components/layouts/Loader/Loader";
// import { BotAvatar } from "@/components/layouts/bot-avatar/BotAvatar";
// import { UserAvatar } from "@/components/layouts/User-avatar/user-avatar";
import { Empty } from "@/components/ui/empty";
import { Card, CardFooter } from "@/components/ui/card";
import ImageEditor from "@/components/layouts/ImageEditor/ImageEditor";
import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "@/components/ui/modal";

const DownloadedImages = [
  "/Images/cat1.jpg",
  "/Images/cat2.jpg",
  "/Images/cat3.webp",
  "/Images/cat4.jpg",
  "/Images/dogs1.jpg",
  "/Images/dogs2.jpg",
]

const ImageGenerationPage = () => {

  const router = useRouter();
  const storeModal = useStoreModal();
  const [photos, setPhotos] = useState<string[]>([]);
  const [editImage, setEditImage] = useState<string>("");


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
      amount: "1",
      resolution: "512x512"
    }
  })

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values);
    try {

      const amount = parseInt(values.amount, 10);

      const selectedPhotos = DownloadedImages.slice(0, amount);

      setPhotos(selectedPhotos);

      form.reset();

    } catch (error: any) {
      if (error?.response?.status === 403) {

      } else {
        toast.error("Something went wrong.");
      }
    } finally {
      router.refresh();
    }
  }


  return (
    <>
      <div className="mt-10">


        <Heading
          title='Image Generation'
          description='Our most Advanced Image Generation System'
          icon={ImageIcon}
          iconColor='text-pink-700'
          bgColor='bg-pink-700/10'
        />

        <div className="px-4 lg:px-8">
          <div>
            <Form  {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="rounded-lg border w-full p-4 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2 ">
                <FormField
                  name="prompt"
                  render={({ field }) => {
                    return (<FormItem className="col-span-12 lg:col-span-6">
                      <FormControl className="m-0 p-0">
                        <Input
                          className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                          disabled={isLoading}
                          placeholder="A picture of hourse in swiss alps"
                          {...field}
                        />
                      </FormControl>

                    </FormItem>);
                  }}
                />
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => {
                    return (
                      <FormItem className="col-span-12 lg:col-span-2">
                        <Select
                          disabled={isLoading}
                          onValueChange={field.onChange}
                          value={field.value}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                defaultValue={field.value}
                              />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent>
                            {amountOptions.map((options) => (
                              <SelectItem
                                key={options.value}
                                value={options.value.toString()}
                              >
                                {options.label}
                              </SelectItem>

                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )
                  }}
                />
                <FormField
                  control={form.control}
                  name="resolution"
                  render={({ field }) => {
                    return (
                      <FormItem className="col-span-12 lg:col-span-2">
                        <Select
                          disabled={isLoading}
                          onValueChange={field.onChange}
                          value={field.value}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue
                                defaultValue={field.value}
                              />
                            </SelectTrigger>
                          </FormControl>

                          <SelectContent>
                            {resolutionOptions.map((options) => (
                              <SelectItem
                                key={options.value}
                                value={options.value}
                              >
                                {options.label}
                              </SelectItem>

                            ))}
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )
                  }}
                />
                <Button className="col-span-12 lg:col-span-2 w-full" disabled={isLoading}> Generate</Button>
              </form>
            </Form>
          </div>
          <div className="space-y-2 mt-4">
            {isLoading && (
              <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                <Loader />
              </div>
            )}
            {photos.length === 0 && !isLoading && (
              <Empty label="No conversation started." />
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
              {photos.map((photo) => (
                <Card key={photo} className="rounded-lg overflow-hidden">
                  <div className="relative aspect-square">
                    <img
                      src={photo.toString()}
                      alt="Generated"
                    />

                  </div>
                  <CardFooter className="p-2 gap-2">
                    <Button onClick={() => window.open(photo)} variant="secondary" className="w-[70%]">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button onClick={() => {
                      setEditImage(photo)
                      storeModal.isOpen = true
                    }} variant="secondary" className="w-[30%]">
                      <FiEdit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Modal
        title={"Edit Image"}
        description={"Edit Your Image"}
        isOpen={storeModal.isOpen}
        onClose={storeModal.onClose}
      >
        <ImageEditor backgroundImageUrl={editImage} />
      </Modal>
    </>
  )
}

export default ImageGenerationPage 
