"use client";

import * as React from "react";
import { CheckIcon, CopyIcon, LoaderCircleIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { QRCodeSVG } from "qrcode.react";

export default function WhatsAppLinkGenerator() {
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [generatedLink, setGeneratedLink] = React.useState("");
  const [copied, setCopied] = React.useState(false);
  const [isGenerating, setIsGenerating] = React.useState(false);

  const generateLink = () => {
    setIsGenerating(true);

    // Simulate a brief loading state
    setTimeout(() => {
      // Format phone number - remove any non-digit characters
      const formattedPhone = phoneNumber.replace(/\D/g, "");

      // Create the WhatsApp link
      const encodedMessage = encodeURIComponent(message);
      const link = `https://wa.me/${formattedPhone}?text=${encodedMessage}`;

      setGeneratedLink(link);
      setIsGenerating(false);

      // toast({
      //   title: "Link generated successfully!",
      //   description: "Your WhatsApp link is ready to share.",
      // })
    }, 300);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
      setCopied(true);

      // toast({
      //   title: "Copied to clipboard!",
      //   description: "Link has been copied to your clipboard.",
      // });

      setTimeout(() => setCopied(false), 1000);
    } catch (err) {
      console.error(err);
      // toast({
      //   title: "Failed to copy",
      //   description: "Please try again or copy manually.",
      //   variant: "destructive",
      // });
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      <Card className="border-green-100 bg-white shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl text-green-600">
            Create Your Link
          </CardTitle>
          <CardDescription>
            Enter a phone number and optional message to generate a WhatsApp
            link
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium">
              Phone Number <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="e.g. +1 (555) 123-4567"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <p className="text-xs text-gray-500">
              Include country code (e.g., +1 for US)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-sm font-medium">
              Pre-filled Message
            </Label>
            <Textarea
              id="message"
              placeholder="Hello! I'm reaching out about..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[100px] resize-y"
            />
          </div>

          <Button
            onClick={generateLink}
            className="w-full bg-green-600 hover:bg-green-700"
            disabled={isGenerating || !phoneNumber}
          >
            {isGenerating ? (
              <>
                <LoaderCircleIcon className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate WhatsApp Link"
            )}
          </Button>
        </CardContent>

        {generatedLink && (
          <CardFooter className="flex flex-col space-y-6 border-t border-green-100 pt-6">
            <Tabs defaultValue="link" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="link">Link</TabsTrigger>
                <TabsTrigger value="qr">QR Code</TabsTrigger>
              </TabsList>

              <TabsContent value="link" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="generated-link"
                    className="text-sm font-medium"
                  >
                    Your WhatsApp Link
                  </Label>
                  <div className="flex items-center gap-2">
                    <Input
                      id="generated-link"
                      value={generatedLink}
                      readOnly
                      className="bg-gray-50"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={copyToClipboard}
                      className="flex-shrink-0 border-green-200 hover:bg-green-50 hover:text-green-600"
                    >
                      {copied ? (
                        <CheckIcon className="h-4 w-4" />
                      ) : (
                        <CopyIcon className="h-4 w-4" />
                      )}
                      <span className="sr-only">Copy to clipboard</span>
                    </Button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 border-green-200 hover:bg-green-50 hover:text-green-600"
                    onClick={() => window.open(generatedLink, "_blank")}
                  >
                    Open in WhatsApp
                  </Button>
                </div>
              </TabsContent>

              <TabsContent
                value="qr"
                className="flex flex-col items-center space-y-4 pt-4"
              >
                <div className="rounded-lg bg-white p-4">
                  <QRCodeSVG
                    value={generatedLink}
                    size={200}
                    bgColor={"#FFFFFF"}
                    fgColor={"#25D366"}
                    level={"L"}
                    includeMargin={false}
                  />
                </div>
                <p className="text-center text-sm text-gray-500">
                  Scan this QR code to open the WhatsApp chat
                </p>
              </TabsContent>
            </Tabs>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
