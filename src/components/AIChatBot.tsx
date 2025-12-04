import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Paperclip, Phone, PhoneOff, Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

interface Message {
  role: "user" | "assistant";
  content: string;
  attachments?: { name: string; type: string; url?: string }[];
}

const chatTranslations = {
  en: {
    greeting: "Hello! I'm here to help you with information about our services. How can I assist you today?",
    placeholder: "Type your message...",
    title: "Customer Support",
    attachFile: "Attach file",
    voiceCall: "Voice call",
    endCall: "End call",
    speaking: "Speaking...",
    listening: "Listening...",
    fileAttached: "File attached",
    callStarted: "Voice call started. Speak now...",
    callEnded: "Voice call ended",
    uploadError: "Failed to process file",
    voiceNotSupported: "Voice calls require additional setup",
  },
  fr: {
    greeting: "Bonjour! Je suis là pour vous aider avec des informations sur nos services. Comment puis-je vous aider aujourd'hui?",
    placeholder: "Tapez votre message...",
    title: "Support Client",
    attachFile: "Joindre un fichier",
    voiceCall: "Appel vocal",
    endCall: "Terminer l'appel",
    speaking: "En train de parler...",
    listening: "À l'écoute...",
    fileAttached: "Fichier joint",
    callStarted: "Appel vocal démarré. Parlez maintenant...",
    callEnded: "Appel vocal terminé",
    uploadError: "Échec du traitement du fichier",
    voiceNotSupported: "Les appels vocaux nécessitent une configuration supplémentaire",
  },
  pt: {
    greeting: "Olá! Estou aqui para ajudá-lo com informações sobre nossos serviços. Como posso ajudá-lo hoje?",
    placeholder: "Digite sua mensagem...",
    title: "Suporte ao Cliente",
    attachFile: "Anexar arquivo",
    voiceCall: "Chamada de voz",
    endCall: "Encerrar chamada",
    speaking: "Falando...",
    listening: "Ouvindo...",
    fileAttached: "Arquivo anexado",
    callStarted: "Chamada de voz iniciada. Fale agora...",
    callEnded: "Chamada de voz encerrada",
    uploadError: "Falha ao processar arquivo",
    voiceNotSupported: "Chamadas de voz requerem configuração adicional",
  },
};

const AIChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();
  const t = chatTranslations[language] || chatTranslations.en;
  
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: t.greeting,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isInCall, setIsInCall] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const dcRef = useRef<RTCDataChannel | null>(null);
  const audioElRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  // Update greeting when language changes
  useEffect(() => {
    const newT = chatTranslations[language] || chatTranslations.en;
    setMessages(prev => {
      if (prev.length === 1 && prev[0].role === "assistant") {
        return [{ role: "assistant", content: newT.greeting }];
      }
      return prev;
    });
  }, [language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setAttachments(prev => [...prev, ...fileArray]);
      toast({
        title: t.fileAttached,
        description: fileArray.map(f => f.name).join(", "),
      });
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
    });
  };

  const sendMessage = async () => {
    if ((!input.trim() && attachments.length === 0) || isLoading) return;

    let messageContent = input.trim();
    const attachmentInfos: { name: string; type: string }[] = [];

    // Process attachments
    if (attachments.length > 0) {
      const attachmentDescriptions = attachments.map(f => `[Attached: ${f.name} (${f.type})]`).join("\n");
      messageContent = attachmentDescriptions + (messageContent ? "\n\n" + messageContent : "");
      attachments.forEach(f => attachmentInfos.push({ name: f.name, type: f.type }));
    }

    const userMessage: Message = { 
      role: "user", 
      content: messageContent,
      attachments: attachmentInfos.length > 0 ? attachmentInfos : undefined
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setAttachments([]);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("customer-support-chat", {
        body: { 
          messages: [...messages, userMessage].map(m => ({ role: m.role, content: m.content })),
          language,
          hasAttachments: attachmentInfos.length > 0
        },
      });

      if (error) throw error;

      const assistantMessage: Message = {
        role: "assistant",
        content: data.message,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const startVoiceCall = useCallback(async () => {
    if (isConnecting) return;
    
    setIsConnecting(true);
    
    try {
      // Get ephemeral token from edge function
      const { data: tokenData, error: tokenError } = await supabase.functions.invoke("realtime-session", {
        body: { language }
      });
      
      if (tokenError || !tokenData?.client_secret?.value) {
        throw new Error(tokenError?.message || "Failed to get session token");
      }

      const EPHEMERAL_KEY = tokenData.client_secret.value;

      // Create audio element
      if (!audioElRef.current) {
        audioElRef.current = document.createElement("audio");
        audioElRef.current.autoplay = true;
      }

      // Create peer connection
      const pc = new RTCPeerConnection();
      pcRef.current = pc;

      // Set up remote audio
      pc.ontrack = (e) => {
        if (audioElRef.current) {
          audioElRef.current.srcObject = e.streams[0];
        }
      };

      // Add local audio track
      const ms = await navigator.mediaDevices.getUserMedia({ audio: true });
      pc.addTrack(ms.getTracks()[0]);

      // Set up data channel
      const dc = pc.createDataChannel("oai-events");
      dcRef.current = dc;
      
      dc.addEventListener("message", (e) => {
        const event = JSON.parse(e.data);
        console.log("Realtime event:", event.type, event);
        
        // Handle different event types
        if (event.type === "session.created") {
          console.log("Session created, sending session update");
          // Session is ready - configuration was already set in the edge function
        } else if (event.type === "session.updated") {
          console.log("Session updated successfully");
        } else if (event.type === "response.audio.delta") {
          setIsListening(false);
        } else if (event.type === "response.audio.done") {
          setIsListening(true);
        } else if (event.type === "response.done") {
          console.log("Response completed");
          setIsListening(true);
        } else if (event.type === "input_audio_buffer.speech_started") {
          console.log("User started speaking");
          setIsListening(true);
        } else if (event.type === "input_audio_buffer.speech_stopped") {
          console.log("User stopped speaking");
          setIsListening(false);
        } else if (event.type === "response.audio_transcript.done" && event.transcript) {
          // Add AI response to chat
          console.log("AI transcript:", event.transcript);
          setMessages(prev => [...prev, { role: "assistant", content: event.transcript }]);
        } else if (event.type === "conversation.item.input_audio_transcription.completed" && event.transcript) {
          // Add user speech to chat
          console.log("User transcript:", event.transcript);
          setMessages(prev => [...prev, { role: "user", content: event.transcript }]);
        } else if (event.type === "error") {
          console.error("Realtime API error:", event.error);
          toast({
            title: "Error",
            description: event.error?.message || "Voice call error",
            variant: "destructive",
          });
        }
      });

      dc.addEventListener("open", () => {
        console.log("Data channel open - ready for conversation");
      });

      // Create and set local description
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      // Connect to OpenAI's Realtime API
      const baseUrl = "https://api.openai.com/v1/realtime";
      const model = "gpt-4o-realtime-preview-2024-12-17";
      const sdpResponse = await fetch(`${baseUrl}?model=${model}`, {
        method: "POST",
        body: offer.sdp,
        headers: {
          Authorization: `Bearer ${EPHEMERAL_KEY}`,
          "Content-Type": "application/sdp"
        },
      });

      if (!sdpResponse.ok) {
        throw new Error("Failed to connect to OpenAI Realtime");
      }

      const answer: RTCSessionDescriptionInit = {
        type: "answer",
        sdp: await sdpResponse.text(),
      };
      
      await pc.setRemoteDescription(answer);
      
      setIsInCall(true);
      setIsListening(true);
      
      toast({
        title: t.callStarted,
      });
    } catch (error: any) {
      console.error("Voice call error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to start voice call",
        variant: "destructive",
      });
      endVoiceCall();
    } finally {
      setIsConnecting(false);
    }
  }, [language, isConnecting, t, toast]);

  const endVoiceCall = useCallback(() => {
    if (dcRef.current) {
      dcRef.current.close();
      dcRef.current = null;
    }
    if (pcRef.current) {
      pcRef.current.close();
      pcRef.current = null;
    }
    if (audioElRef.current) {
      audioElRef.current.srcObject = null;
    }
    setIsInCall(false);
    setIsListening(false);
    toast({
      title: t.callEnded,
    });
  }, [t, toast]);

  const toggleVoiceCall = () => {
    if (isInCall) {
      endVoiceCall();
    } else {
      startVoiceCall();
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (dcRef.current) dcRef.current.close();
      if (pcRef.current) pcRef.current.close();
    };
  }, []);

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 z-50"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-6rem)] bg-background border border-border rounded-lg shadow-2xl flex flex-col z-50">
          {/* Header */}
          <div className="bg-primary text-primary-foreground p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              <h3 className="font-semibold">{t.title}</h3>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleVoiceCall}
                disabled={isConnecting}
                className={`text-primary-foreground hover:bg-primary-foreground/20 ${isInCall ? 'bg-red-500/30' : ''} ${isConnecting ? 'opacity-50' : ''}`}
                title={isInCall ? t.endCall : t.voiceCall}
              >
                {isConnecting ? (
                  <div className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                ) : isInCall ? (
                  <PhoneOff className="h-5 w-5" />
                ) : (
                  <Phone className="h-5 w-5" />
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-primary-foreground hover:bg-primary-foreground/20"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Voice Call Indicator */}
          {isInCall && (
            <div className="bg-primary/10 px-4 py-2 flex items-center gap-2 text-sm text-primary">
              {isListening ? (
                <>
                  <Mic className="h-4 w-4 animate-pulse" />
                  <span>{t.listening}</span>
                </>
              ) : (
                <>
                  <MicOff className="h-4 w-4" />
                  <span>{t.speaking}</span>
                </>
              )}
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {message.attachments && message.attachments.length > 0 && (
                    <div className="mb-2 space-y-1">
                      {message.attachments.map((att, i) => (
                        <div key={i} className="text-xs opacity-70 flex items-center gap-1">
                          <Paperclip className="h-3 w-3" />
                          {att.name}
                        </div>
                      ))}
                    </div>
                  )}
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Attachments Preview */}
          {attachments.length > 0 && (
            <div className="px-4 py-2 border-t border-border flex flex-wrap gap-2">
              {attachments.map((file, index) => (
                <div key={index} className="bg-muted rounded px-2 py-1 text-xs flex items-center gap-1">
                  <Paperclip className="h-3 w-3" />
                  <span className="max-w-[100px] truncate">{file.name}</span>
                  <button 
                    onClick={() => removeAttachment(index)}
                    className="text-destructive hover:text-destructive/80"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="hidden"
                onChange={handleFileSelect}
                accept="image/*,.pdf,.doc,.docx,.txt,.xls,.xlsx"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
                className="shrink-0"
                title={t.attachFile}
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t.placeholder}
                disabled={isLoading}
                className="flex-1"
              />
              <Button
                onClick={sendMessage}
                disabled={isLoading || (!input.trim() && attachments.length === 0)}
                size="icon"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatBot;
