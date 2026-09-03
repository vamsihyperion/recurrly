import { useSignUp } from "@clerk/expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link, router } from "expo-router";
import { useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignUpScreen() {
  const { signUp } = useSignUp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formReady = useMemo(() => {
    return email.trim().length > 0 && password.length > 0 && confirmPassword.length > 0;
  }, [confirmPassword, email, password]);

  const validate = () => {
    let isValid = true;

    if (!email.trim()) {
      setEmailError("Enter your email address.");
      isValid = false;
    } else if (!emailRegex.test(email.trim())) {
      setEmailError("Use a valid email address.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Choose a password.");
      isValid = false;
    } else if (password.length < 8 || password.length > 15) {
      setPasswordError("Use between 8 and 15 characters.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Confirm your password.");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match.");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    return isValid;
  };

  const handleSubmit = async () => {
    if (!signUp) {
      setSubmitError("Account creation is unavailable right now. Please try again.");
      return;
    }

    setSubmitError("");
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await (signUp as any).password({
        emailAddress: email.trim(),
        password,
      });
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

      const verification = await (signUp as any).verifications.sendEmailCode();
      if (verification?.error) {
        throw verification.error;
      }
      router.push("/(auth)/verify");
    } catch (error) {
      const clerkError = error as {
        errors?: { longMessage?: string; message?: string }[];
      };

      const message =
        clerkError?.errors?.[0]?.longMessage ||
        clerkError?.errors?.[0]?.message ||
        "We couldn't create your account right now. Please try again.";

      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
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

              <Text className="auth-title">Create your account</Text>
              <Text className="auth-subtitle">
                Track renewals, monitor budget, and stay ahead of every subscription
              </Text>
            </View>

            <View className="auth-card">
              <View className="auth-form">
                <View className="auth-field">
                  <Text className="auth-label">Email</Text>
                  <TextInput
                    autoCapitalize="none"
                    autoComplete="email"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={(value) => {
                      setEmail(value);
                      if (emailError) {
                        setEmailError("");
                      }
                      if (submitError) {
                        setSubmitError("");
                      }
                    }}
                    placeholder="Enter your email"
                    placeholderTextColor="#7d7a70"
                    className={emailError ? "auth-input auth-input-error" : "auth-input"}
                  />
                  {emailError ? <Text className="auth-error">{emailError}</Text> : null}
                </View>

                <View className="auth-field">
                  <Text className="auth-label">Password</Text>
                  <View className="relative">
                    <TextInput
                      secureTextEntry={!showPassword}
                      maxLength={15}
                      value={password}
                      onChangeText={(value) => {
                        setPassword(value);
                        if (passwordError) {
                          setPasswordError("");
                        }
                        if (submitError) {
                          setSubmitError("");
                        }
                      }}
                      placeholder="Create a password"
                      placeholderTextColor="#7d7a70"
                      className={passwordError ? "auth-input auth-input-error" : "auth-input"}
                      style={{ paddingRight: 52 }}
                    />
                    <Pressable
                      accessibilityLabel={showPassword ? "Hide password" : "Show password"}
                      className="absolute bottom-0 right-0 top-0 w-12 items-center justify-center"
                      onPress={() => setShowPassword((visible) => !visible)}
                      hitSlop={8}
                    >
                      <Ionicons
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        size={21}
                        color="#7d7a70"
                      />
                    </Pressable>
                  </View>
                  {passwordError ? <Text className="auth-error">{passwordError}</Text> : null}
                </View>

                <View className="auth-field">
                  <Text className="auth-label">Confirm password</Text>
                  <View className="relative">
                    <TextInput
                      secureTextEntry={!showConfirmPassword}
                      maxLength={15}
                      value={confirmPassword}
                      onChangeText={(value) => {
                        setConfirmPassword(value);
                        if (confirmPasswordError) {
                          setConfirmPasswordError("");
                        }
                        if (submitError) {
                          setSubmitError("");
                        }
                      }}
                      placeholder="Confirm your password"
                      placeholderTextColor="#7d7a70"
                      className={confirmPasswordError ? "auth-input auth-input-error" : "auth-input"}
                      style={{ paddingRight: 52 }}
                    />
                    <Pressable
                      accessibilityLabel={
                        showConfirmPassword ? "Hide password confirmation" : "Show password confirmation"
                      }
                      className="absolute bottom-0 right-0 top-0 w-12 items-center justify-center"
                      onPress={() => setShowConfirmPassword((visible) => !visible)}
                      hitSlop={8}
                    >
                      <Ionicons
                        name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                        size={21}
                        color="#7d7a70"
                      />
                    </Pressable>
                  </View>
                  {confirmPasswordError ? (
                    <Text className="auth-error">{confirmPasswordError}</Text>
                  ) : null}
                </View>

                {submitError ? <Text className="auth-error">{submitError}</Text> : null}

                <Pressable
                  className={isSubmitting || !formReady ? "auth-button auth-button-disabled" : "auth-button"}
                  onPress={handleSubmit}
                  disabled={isSubmitting || !formReady}
                >
                  <Text className="auth-button-text">
                    {isSubmitting ? "Creating account…" : "Create account"}
                  </Text>
                </Pressable>

                <View className="auth-link-row">
                  <Text className="auth-link-copy">Already have an account?</Text>
                  <Link href="/(auth)/signIn" className="auth-link">
                    Sign in
                  </Link>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
