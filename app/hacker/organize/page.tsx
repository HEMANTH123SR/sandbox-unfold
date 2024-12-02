'use client';
import React, { useState } from 'react';
import { z } from 'zod';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { createImage } from '@/lib/appwrite';
import { Loader2, CalendarIcon } from 'lucide-react';
import { newAgeFontBold } from '@/fonts/font';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

// Updated Hackathon Schema with past date validation
const HackathonSchema = z.object({
  name: z.string().min(3, 'Hackathon name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  date: z
    .date({
      required_error: 'Please select a valid past date',
      invalid_type_error: 'Invalid date',
    })
    .refine((val) => val < new Date(), 'Please select a valid past date'),
  location: z.string().min(3, 'Location must be at least 3 characters'),
  cover: z.string().min(1, 'Cover image is required'),
  organizerId: z.string().min(1, 'Organizer ID is required'),
});

const CreateHackathonPage = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { user } = useUser();

  const [isLoading, setIsLoading] = useState(false);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [stampImage, setStampImage] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [imageErrors, setImageErrors] = useState<{
    cover?: string;
    stamp?: string;
  }>({});

  const methods = useForm({
    resolver: zodResolver(HackathonSchema),
    defaultValues: {
      name: '',
      description: '',
      date: undefined,
      location: '',
      cover: '',
      stamp: '',
      organizerId: user?.id,
    },
  });

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
    type: 'cover' | 'stamp'
  ) => {
    const file = event.target.files?.[0];
    setImageErrors((prev) => ({ ...prev, [type]: undefined }));

    if (file) {
      try {
        const result = await createImage(file);

        if (result.status === "success") {
          if (result.id) {
            methods.setValue(type, result.id);
          }
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64Image = reader.result as string;
            if (type === 'cover') {
              setCoverImage(base64Image);
            } else {
              setStampImage(base64Image);
            }
          };
          reader.readAsDataURL(file);
        } else {
          setImageErrors((prev) => ({
            ...prev,
            [type]: 'Failed to upload image. Please try again.',
          }));
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setImageErrors((prev) => ({
          ...prev,
          [type]: 'Error uploading image. Please try again.',
        }));
      }
    }
  };

  const onSubmit = async (data: z.infer<typeof HackathonSchema>) => {
    if (!user?.id) {
      toast({
        title: 'Authentication Required',
        description: 'Please sign in to create a hackathon',
        variant: 'destructive',
      });
      return;
    }

    console.log('Form data:', data);

    setIsLoading(true);
    try {
      const response = await fetch('/api/hackathon', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          date: data.date.toISOString(), // Convert date to ISO string
        }),
      });

      console.log('response: ', response);

      const result = await response.json();

      if (!response.ok) {
        toast({
          title: 'Error',
          description: result.message || 'Failed to create hackathon',
          variant: 'destructive',
        });
        return;
      }

      toast({
        title: 'Success',
        description: 'Hackathon created successfully',
      });

      router.push(`/hacker/${result.hackathonId}`);
    } catch (error) {
      console.error('Hackathon creation error:', error);
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formFields = [
    {
      type: 'cover',
      label: "Let's start with a cover image",
      description: 'Choose an image that represents your hackathon',
    },
    {
      type: 'stamp',
      label: 'Now, add a stamp image',
      description: "This will be used as your hackathon's badge",
    },
    {
      type: 'name',
      label: "What's your hackathon called?",
      description: 'Give it a memorable name',
    },
    {
      type: 'description',
      label: 'Describe your hackathon',
      description: 'Tell us what makes it special',
    },
    {
      type: 'date',
      label: 'When did it happen?',
      description: 'Select the date of your hackathon',
    },
    {
      type: 'location',
      label: 'Where did it take place?',
      description: 'Enter the location or platform',
    },
  ];

  const currentField = formFields[currentStep];

  const handleFinalSubmit = () => {
    console.log('Final form data:', methods.getValues());
    // Trigger validation for all fields
    methods.trigger().then((isValid) => {
      if (isValid) {
        // If all fields are valid, submit the form
        const formData = methods.getValues();
        if (formData.date) {
          onSubmit({
            ...formData,
            date: new Date(formData.date),
            organizerId: formData.organizerId || "",
          });
        } else {
          toast({
            title: "Form Validation Error",
            description: "Please select a valid date",
            variant: "destructive",
          });
        }
      } else {
        // If validation fails, show error toast and log errors
        const errors = methods.formState.errors;

        // Collect error messages
        const errorMessages = Object.values(errors)
          .map((error) => error.message)
          .filter(Boolean)
          .join(', ');

        toast({
          title: 'Form Validation Error',
          description: errorMessages || 'Please check your form inputs',
          variant: 'destructive',
        });

        // Log detailed errors for debugging
        console.error('Form Validation Errors:', errors);
      }
    });
  };

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-black text-white flex flex-col h-screen overflow-y-hidden">
        <div
          className="fixed top-0 w-full flex justify-between items-center border-b border-gray-800 h-16 px-6 bg-black/90 backdrop-blur-sm z-50"
          style={newAgeFontBold.style}
        >
          <Button
            variant="ghost"
            className="text-gray-400 hover:text-white"
            onClick={() => router.push('/')}
          >
            ESC to quit
          </Button>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-400">
              {currentStep + 1} of {formFields.length}
            </div>
            <Button
              type="button"
              variant="ghost"
              onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))}
              disabled={currentStep === 0}
              className="text-gray-400 hover:text-black"
            >
              ↑ Back
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                if (currentStep === formFields.length - 1) {
                  handleFinalSubmit();
                } else {
                  setCurrentStep((prev) =>
                    Math.min(formFields.length - 1, prev + 1)
                  );
                }
              }}
              disabled={isLoading}
              className="text-gray-400 hover:text-black"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : currentStep === formFields.length - 1 ? (
                '↵ Submit'
              ) : (
                '↓ Next'
              )}
            </Button>
          </div>
        </div>

        <Card className="min-h-screen bg-black border-none w-screen text-white pt-32">
          <div className="max-w-3xl mx-auto px-6">
            <div className="mb-8">
              <h1 className="text-5xl font-bold mb-4 transition-all duration-300">
                {currentField.label}
              </h1>
              <p className="text-xl text-gray-400 transition-all duration-300">
                {currentField.description}
              </p>
            </div>

            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="transition-all duration-300">
                {currentField.type === 'cover' && (
                  <FormItem className="space-y-6">
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, 'cover')}
                          className="text-lg p-8 border-2 border-dashed border-gray-700 rounded-lg bg-transparent hover:border-gray-500 transition-colors cursor-pointer"
                        />
                      </div>
                    </FormControl>
                    {coverImage && (
                      <div className="mt-4">
                        <Image
                          src={coverImage}
                          alt="Cover Preview"
                          width={400}
                          height={225}
                          className="rounded-lg object-cover"
                        />
                      </div>
                    )}
                    {imageErrors.cover && (
                      <p className="text-red-500 text-lg">
                        {imageErrors.cover}
                      </p>
                    )}
                  </FormItem>
                )}

                {currentField.type === 'stamp' && (
                  <FormItem className="space-y-6">
                    <FormControl>
                      <div className="relative">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleImageUpload(e, 'stamp')}
                          className="text-lg p-8 border-2 border-dashed border-gray-700 rounded-lg bg-transparent hover:border-gray-500 transition-colors cursor-pointer"
                        />
                      </div>
                    </FormControl>
                    {stampImage && (
                      <div className="mt-4">
                        <Image
                          src={stampImage}
                          alt="Stamp Preview"
                          width={200}
                          height={200}
                          className="rounded-lg object-cover"
                        />
                      </div>
                    )}
                    {imageErrors.stamp && (
                      <p className="text-red-500 text-lg">
                        {imageErrors.stamp}
                      </p>
                    )}
                  </FormItem>
                )}

                {currentField.type === 'name' && (
                  <FormField
                    control={methods.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="rounded-none border-none">
                        <FormControl className="border-none rounded-none">
                          <Input
                            {...field}
                            placeholder="Type your answer here..."
                            className="text-4xl h-auto py-4 px-0  rounded-none  focus:ring-0 placeholder:text-gray-700 "
                          />
                        </FormControl>
                        <FormMessage className="text-5xl" />
                      </FormItem>
                    )}
                  />
                )}

                {currentField.type === 'description' && (
                  <FormField
                    control={methods.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <textarea
                            {...field}
                            placeholder="Type your answer here..."
                            className="w-full text-4xl p-0 border-none bg-transparent focus:ring-0 placeholder:text-gray-700 min-h-[150px] resize-none outline-none"
                          />
                        </FormControl>
                        <FormMessage className="text-lg" />
                      </FormItem>
                    )}
                  />
                )}

                {currentField.type === 'date' && (
                  <FormField
                    control={methods.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={'outline'}
                                className={cn(
                                  'w-full pl-3 text-left font-normal text-4xl h-auto py-4 px-0 bg-transparent border-none hover:bg-transparent hover:text-primary',
                                  !field.value && 'text-gray-500'
                                )}
                              >
                                {field.value ? (
                                  format(field.value, 'PPP')
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon
                                  className="ml-auto  text-gray-500"
                                  style={{
                                    width: '2rem',
                                    height: '2rem',
                                  }}
                                  strokeWidth={2}
                                />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              // eslint-disable-next-line @typescript-eslint/no-explicit-any
                              onSelect={(date: any) => {
                                field.onChange(date);
                              }}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date('1900-01-01')
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage className="text-lg" />
                      </FormItem>
                    )}
                  />
                )}

                {currentField.type === 'location' && (
                  <FormField
                    control={methods.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Type your answer here..."
                            className="text-5xl h-auto py-4 px-0 border-none bg-transparent focus:ring-0 placeholder:text-gray-700"
                          />
                        </FormControl>
                        <FormMessage className="text-lg" />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            </form>
          </div>
        </Card>
        <div className="text-black">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum in
          pariatur ipsam omnis perferendis voluptates ratione! Provident aliquam
          maiores inventore, esse quam quis kkks
        </div>
      </div>
    </FormProvider>
  );
};

export default CreateHackathonPage;
