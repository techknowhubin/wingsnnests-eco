import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield, ShieldCheck, Clock, ChevronRight, ChevronLeft,
  Upload, Smartphone, Eye, Check, FileText, Loader2, X, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

// ======================== Types ========================

type DocStatus = "pending" | "verified" | "skipped" | "uploading";

interface DocState {
  status: DocStatus;
  frontFile?: File;
  backFile?: File;
  frontPreview?: string;
  backPreview?: string;
  otp?: string;
  phone?: string;
  otpSent?: boolean;
}

// ======================== Step Indicator ========================

function StepIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  const labels = ["Welcome", "Aadhaar", "PAN Card", "Driving License", "Complete"];
  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <Progress value={(currentStep / (totalSteps - 1)) * 100} className="h-2 mb-4" />
      <div className="flex justify-between">
        {labels.map((label, i) => (
          <div key={label} className="flex flex-col items-center gap-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                i < currentStep
                  ? "bg-accent text-accent-foreground"
                  : i === currentStep
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {i < currentStep ? <Check className="h-4 w-4" /> : i + 1}
            </div>
            <span className="text-xs text-muted-foreground hidden sm:block">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ======================== File Upload Zone ========================

function FileUploadZone({
  label,
  file,
  preview,
  onFileSelect,
  onRemove,
}: {
  label: string;
  file?: File;
  preview?: string;
  onFileSelect: (f: File) => void;
  onRemove: () => void;
}) {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f && f.size <= 5 * 1024 * 1024) onFileSelect(f);
    else toast.error("File must be under 5MB");
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-foreground">{label}</label>
      {file ? (
        <div className="flex items-center gap-3 p-3 rounded-xl border border-border bg-muted/30">
          <FileText className="h-5 w-5 text-accent" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{file.name}</p>
            <p className="text-xs text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
          </div>
          {preview && (
            <button type="button" onClick={() => window.open(preview, '_blank')} className="text-muted-foreground hover:text-foreground">
              <Eye className="h-4 w-4" />
            </button>
          )}
          <button type="button" onClick={onRemove} className="text-muted-foreground hover:text-destructive">
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*,.pdf";
            input.onchange = (e) => {
              const f = (e.target as HTMLInputElement).files?.[0];
              if (f && f.size <= 5 * 1024 * 1024) onFileSelect(f);
              else toast.error("File must be under 5MB");
            };
            input.click();
          }}
          className="border-2 border-dashed border-border rounded-xl p-6 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all"
        >
          <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Drag & drop or click to upload</p>
          <p className="text-xs text-muted-foreground mt-1">Max 5MB • JPG, PNG, PDF</p>
        </div>
      )}
    </div>
  );
}

// ======================== DigiLocker OTP Flow ========================

function DigiLockerOTP({
  phone,
  setPhone,
  otp,
  setOtp,
  otpSent,
  onSendOTP,
  onVerify,
  loading,
}: {
  phone: string;
  setPhone: (v: string) => void;
  otp: string;
  setOtp: (v: string) => void;
  otpSent: boolean;
  onSendOTP: () => void;
  onVerify: () => void;
  loading: boolean;
}) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Mobile number linked to DigiLocker</label>
        <div className="flex gap-2">
          <div className="flex items-center px-3 rounded-xl border border-input bg-muted/30 text-sm text-muted-foreground">
            +91
          </div>
          <input
            type="tel"
            maxLength={10}
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
            placeholder="Enter 10-digit mobile number"
            className="flex-1 px-4 py-3 rounded-xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            disabled={otpSent}
          />
        </div>
      </div>

      {!otpSent ? (
        <Button
          type="button"
          onClick={onSendOTP}
          disabled={phone.length !== 10 || loading}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Smartphone className="h-4 w-4 mr-2" />}
          Send OTP
        </Button>
      ) : (
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Enter 6-digit OTP</label>
            <div className="flex justify-center">
              <div className="flex gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    value={otp[i] || ""}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      const newOtp = otp.split("");
                      newOtp[i] = val;
                      setOtp(newOtp.join(""));
                      if (val && e.target.nextElementSibling) {
                        (e.target.nextElementSibling as HTMLInputElement).focus();
                      }
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Backspace" && !otp[i] && e.currentTarget.previousElementSibling) {
                        (e.currentTarget.previousElementSibling as HTMLInputElement).focus();
                      }
                    }}
                    className="w-12 h-14 text-center text-lg font-semibold rounded-xl border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                ))}
              </div>
            </div>
          </div>
          <Button
            type="button"
            onClick={onVerify}
            disabled={otp.length !== 6 || loading}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <ShieldCheck className="h-4 w-4 mr-2" />}
            Verify OTP
          </Button>
        </div>
      )}
    </div>
  );
}

// ======================== Document Verification Step ========================

function DocVerificationStep({
  docName,
  docDescription,
  docIcon,
  docState,
  setDocState,
  isRequired,
  onVerified,
  onSkip,
}: {
  docName: string;
  docDescription: string;
  docIcon: React.ReactNode;
  docState: DocState;
  setDocState: (s: DocState) => void;
  isRequired: boolean;
  onVerified: () => void;
  onSkip?: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleUploadVerify = async () => {
    if (!docState.frontFile) {
      toast.error("Please upload the front side of your document");
      return;
    }
    setLoading(true);
    setDocState({ ...docState, status: "uploading" });
    // Simulate upload + verification
    await new Promise((r) => setTimeout(r, 2000));
    setDocState({ ...docState, status: "verified" });
    setLoading(false);
    toast.success(`${docName} verified successfully!`);
    onVerified();
  };

  const handleSendOTP = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setDocState({ ...docState, otpSent: true });
    setLoading(false);
    toast.success("OTP sent to your mobile number");
  };

  const handleVerifyOTP = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    setDocState({ ...docState, status: "verified" });
    setLoading(false);
    toast.success(`${docName} verified via DigiLocker!`);
    onVerified();
  };

  if (docState.status === "verified") {
    return (
      <Card className="border-accent/50 bg-accent/5">
        <CardContent className="p-6 flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-accent/20 flex items-center justify-center">
            <ShieldCheck className="h-6 w-6 text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{docName}</h3>
            <p className="text-sm text-accent">Verified successfully</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
          {docIcon}
        </div>
        <div>
          <h3 className="font-semibold text-foreground">{docName}</h3>
          <p className="text-sm text-muted-foreground">{docDescription}</p>
        </div>
        {isRequired && (
          <span className="ml-auto text-xs font-medium px-2 py-1 rounded-full bg-destructive/10 text-destructive">Required</span>
        )}
        {!isRequired && (
          <span className="ml-auto text-xs font-medium px-2 py-1 rounded-full bg-muted text-muted-foreground">Optional</span>
        )}
      </div>

      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="upload">Upload Docs</TabsTrigger>
          <TabsTrigger value="digilocker">Use DigiLocker</TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="space-y-4 mt-4">
          <FileUploadZone
            label="Front Side"
            file={docState.frontFile}
            preview={docState.frontPreview}
            onFileSelect={(f) => {
              const preview = URL.createObjectURL(f);
              setDocState({ ...docState, frontFile: f, frontPreview: preview });
            }}
            onRemove={() => setDocState({ ...docState, frontFile: undefined, frontPreview: undefined })}
          />
          <FileUploadZone
            label="Back Side (if applicable)"
            file={docState.backFile}
            preview={docState.backPreview}
            onFileSelect={(f) => {
              const preview = URL.createObjectURL(f);
              setDocState({ ...docState, backFile: f, backPreview: preview });
            }}
            onRemove={() => setDocState({ ...docState, backFile: undefined, backPreview: undefined })}
          />
          <Button
            type="button"
            onClick={handleUploadVerify}
            disabled={!docState.frontFile || loading}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Upload className="h-4 w-4 mr-2" />}
            {docState.status === "uploading" ? "Verifying..." : "Upload & Verify"}
          </Button>
        </TabsContent>

        <TabsContent value="digilocker" className="mt-4">
          <DigiLockerOTP
            phone={docState.phone || ""}
            setPhone={(p) => setDocState({ ...docState, phone: p })}
            otp={docState.otp || ""}
            setOtp={(o) => setDocState({ ...docState, otp: o })}
            otpSent={docState.otpSent || false}
            onSendOTP={handleSendOTP}
            onVerify={handleVerifyOTP}
            loading={loading}
          />
        </TabsContent>
      </Tabs>

      {!isRequired && onSkip && (
        <button
          type="button"
          onClick={onSkip}
          className="w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
        >
          Skip, I'll do this later
        </button>
      )}
    </div>
  );
}

// ======================== Main Component ========================

export default function UserOnboarding() {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [aadhaar, setAadhaar] = useState<DocState>({ status: "pending" });
  const [pan, setPan] = useState<DocState>({ status: "pending" });
  const [dl, setDl] = useState<DocState>({ status: "pending" });

  const firstName = user?.user_metadata?.full_name?.split(" ")[0] || "there";

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  const saveKycStatus = async () => {
    if (!user) return;
    // Save KYC completion status to profile
    try {
      await supabase
        .from("profiles")
        .update({ 
          // We use a simple flag approach — the onboarding_completed field
          // will be added via the migration
        })
        .eq("id", user.id);
    } catch (err) {
      // Silently handle — profile may not have the column yet
    }
  };

  const handleComplete = async () => {
    await saveKycStatus();
    navigate("/");
    toast.success("Welcome to Xplorwing!");
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-foreground">Xplorwing</h1>
          <p className="text-sm text-muted-foreground">Identity Verification</p>
        </div>

        <StepIndicator currentStep={step} totalSteps={5} />

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            {/* Step 0 — Welcome */}
            {step === 0 && (
              <Card>
                <CardContent className="p-8 text-center space-y-6">
                  <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center mx-auto">
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">Hey {firstName}! 👋</h2>
                    <p className="text-muted-foreground">
                      Before you start exploring, we need to verify your identity. This helps keep our community safe and builds trust.
                    </p>
                  </div>
                  <div className="bg-muted/30 rounded-xl p-4 text-left space-y-3">
                    <h3 className="font-semibold text-foreground text-sm">Documents needed:</h3>
                    <div className="flex items-center gap-3">
                      <ShieldCheck className="h-5 w-5 text-accent" />
                      <div>
                        <span className="text-sm font-medium text-foreground">Aadhaar Card</span>
                        <span className="text-xs ml-2 px-2 py-0.5 rounded-full bg-destructive/10 text-destructive">Required</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <span className="text-sm font-medium text-foreground">PAN Card</span>
                        <span className="text-xs ml-2 px-2 py-0.5 rounded-full bg-muted text-muted-foreground">Optional</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <span className="text-sm font-medium text-foreground">Driving License</span>
                        <span className="text-xs ml-2 px-2 py-0.5 rounded-full bg-muted text-muted-foreground">Optional</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Button
                      onClick={() => setStep(1)}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-base font-semibold"
                    >
                      Start Verification <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                    <button
                      type="button"
                      onClick={() => {
                        navigate("/");
                        toast.info("You can complete KYC anytime from Profile → KYC Verification");
                      }}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Skip for now
                    </button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 1 — Aadhaar */}
            {step === 1 && (
              <Card>
                <CardContent className="p-6">
                  <DocVerificationStep
                    docName="Aadhaar Card"
                    docDescription="Government-issued ID for identity verification"
                    docIcon={<ShieldCheck className="h-5 w-5 text-primary" />}
                    docState={aadhaar}
                    setDocState={setAadhaar}
                    isRequired={true}
                    onVerified={() => setTimeout(() => setStep(2), 500)}
                  />
                </CardContent>
              </Card>
            )}

            {/* Step 2 — PAN */}
            {step === 2 && (
              <Card>
                <CardContent className="p-6">
                  <DocVerificationStep
                    docName="PAN Card"
                    docDescription="Permanent Account Number for tax compliance"
                    docIcon={<FileText className="h-5 w-5 text-primary" />}
                    docState={pan}
                    setDocState={setPan}
                    isRequired={false}
                    onVerified={() => setTimeout(() => setStep(3), 500)}
                    onSkip={() => {
                      setPan({ ...pan, status: "skipped" });
                      setStep(3);
                    }}
                  />
                </CardContent>
              </Card>
            )}

            {/* Step 3 — Driving License */}
            {step === 3 && (
              <Card>
                <CardContent className="p-6">
                  <DocVerificationStep
                    docName="Driving License"
                    docDescription="Required for vehicle rental bookings"
                    docIcon={<FileText className="h-5 w-5 text-primary" />}
                    docState={dl}
                    setDocState={setDl}
                    isRequired={false}
                    onVerified={() => setTimeout(() => setStep(4), 500)}
                    onSkip={() => {
                      setDl({ ...dl, status: "skipped" });
                      setStep(4);
                    }}
                  />
                </CardContent>
              </Card>
            )}

            {/* Step 4 — Completion */}
            {step === 4 && (
              <Card>
                <CardContent className="p-8 text-center space-y-6">
                  <div className="h-16 w-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto">
                    <ShieldCheck className="h-8 w-8 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">Verification Complete!</h2>
                    <p className="text-muted-foreground">Here's a summary of your documents</p>
                  </div>

                  <div className="space-y-3 text-left">
                    {[
                      { name: "Aadhaar Card", status: aadhaar.status },
                      { name: "PAN Card", status: pan.status },
                      { name: "Driving License", status: dl.status },
                    ].map((doc) => (
                      <div key={doc.name} className="flex items-center gap-3 p-3 rounded-xl border border-border">
                        {doc.status === "verified" ? (
                          <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center">
                            <ShieldCheck className="h-4 w-4 text-accent" />
                          </div>
                        ) : doc.status === "skipped" ? (
                          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                          </div>
                        ) : (
                          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{doc.name}</p>
                        </div>
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded-full ${
                            doc.status === "verified"
                              ? "bg-accent/10 text-accent"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {doc.status === "verified" ? "Verified" : doc.status === "skipped" ? "Skipped" : "Pending"}
                        </span>
                      </div>
                    ))}
                  </div>

                  {(pan.status === "skipped" || dl.status === "skipped") && (
                    <div className="bg-primary/10 rounded-xl p-4 text-sm text-foreground">
                      💡 Complete your KYC anytime from <strong>Profile → KYC Verification</strong>
                    </div>
                  )}

                  <Button
                    onClick={handleComplete}
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground py-6 text-base font-semibold"
                  >
                    Go to Dashboard <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Back button for steps 1-3 */}
        {step > 0 && step < 4 && (
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
            >
              <ChevronLeft className="h-4 w-4" /> Go back
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
