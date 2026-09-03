import { useSignUp } from "@clerk/expo";
import { router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

export default function VerifyEmailScreen() {
  const { signUp } = useSignUp() as any;
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleVerify = async () => {
    if (!signUp) {
      setError("Email verification is unavailable right now. Please try again.");
      return;
    }

    if (!code.trim()) {
      setError("Enter the 6-digit verification code.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const result = await (signUp as any).verifications.verifyEmailCode({ code: code.trim() });
      if (result?.error) {
        throw result.error;
      }

      if (signUp.status === "complete") {
        const finalizeResult = await (signUp as any).finalize();
        if (finalizeResult?.error) {
          throw finalizeResult.error;
        }
        router.replace("/(tabs)");
        return;
      }

      setError("That code didn't match. Please try again.");
    } catch (err) {
      const clerkError = err as {
        errors?: { longMessage?: string; message?: string }[];
      };

      setError(
        clerkError?.errors?.[0]?.longMessage ||
          clerkError?.errors?.[0]?.message ||
          "We couldn't verify your email address. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (!signUp) {
      setError("Email verification is unavailable right now. Please try again.");
      return;
    }

    setError("");
    try {
      const result = await (signUp as any).verifications.sendEmailCode();
      if (result?.error) {
        throw result.error;
      }
    } catch (err) {
      const clerkError = err as {
        errors?: { longMessage?: string; message?: string }[];
      };

      setError(
        clerkError?.errors?.[0]?.longMessage ||
          clerkError?.errors?.[0]?.message ||
          "We couldn't resend the code. Please try again."
      );
    }
  };

  return (
    <View className="auth-safe-area">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          className="auth-scroll"
          contentContainerClassName="auth-content items-center"
        >
          <View className="w-full max-w-[440px]">
            <View className="auth-brand-block">
              <View className="auth-logo-wrap">
                <View className="auth-logo-mark">
                  <Text className="auth-logo-mark-text">R</Text>
                </View>
                <View>
                  <Text className="auth-wordmark">Recurrly</Text>
                  <Text className="auth-wordmark-sub">Smart billing</Text>
                </View>
              </View>

              <Text className="auth-title">Verify your email</Text>
              <Text className="auth-subtitle">
                Enter the code sent to your inbox to finish setting up your account.
              </Text>
            </View>

            <View className="auth-card">
              <View className="auth-form">
                <View className="auth-field">
                  <Text className="auth-label">Verification code</Text>
                  <TextInput
                    autoCapitalize="none"
                    keyboardType="number-pad"
                    textContentType="oneTimeCode"
                    value={code}
                    onChangeText={setCode}
                    placeholder="Enter 6-digit code"
                    placeholderTextColor="#7d7a70"
                    className={error ? "auth-input auth-input-error" : "auth-input"}
                  />
                  {error ? <Text className="auth-error">{error}</Text> : null}
                </View>

                <Pressable
                  className={isSubmitting || !code.trim() ? "auth-button auth-button-disabled" : "auth-button"}
                  onPress={handleVerify}
                  disabled={isSubmitting || !code.trim()}
                >
                  <Text className="auth-button-text">
                    {isSubmitting ? "Verifying…" : "Verify email"}
                  </Text>
                </Pressable>

                <Pressable className="auth-secondary-button" onPress={handleResend}>
                  <Text className="auth-secondary-button-text">Resend code</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
