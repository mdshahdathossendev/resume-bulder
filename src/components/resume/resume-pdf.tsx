import {
  Document,
  Page,
  StyleSheet,
  Text,
  View,
  type DocumentProps,
} from "@react-pdf/renderer";
import type { ReactElement } from "react";
import type { ResumeFormValues } from "@/lib/resume-schema";

const styles = StyleSheet.create({
  page: { padding: 34, color: "#24352a", fontFamily: "Helvetica", fontSize: 9 },
  header: { backgroundColor: "#315a3b", margin: -34, marginBottom: 22, padding: 30, color: "#ffffff" },
  name: { fontSize: 24, fontFamily: "Helvetica-Bold", marginBottom: 6 },
  role: { fontSize: 12, marginBottom: 8 },
  contact: { fontSize: 8, color: "#e4eee5" },
  columns: { flexDirection: "row", gap: 22 },
  sidebar: { width: "32%", backgroundColor: "#edf2ec", padding: 14 },
  content: { width: "68%" },
  section: { marginBottom: 14 },
  sectionTitle: { color: "#315a3b", fontSize: 9, fontFamily: "Helvetica-Bold", marginBottom: 8, textTransform: "uppercase" },
  detail: { marginBottom: 8 },
  label: { color: "#68766b", fontSize: 7, fontFamily: "Helvetica-Bold", marginBottom: 3, textTransform: "uppercase" },
  value: { fontSize: 9, lineHeight: 1.35 },
  footer: { position: "absolute", bottom: 18, left: 34, right: 34, color: "#879187", fontSize: 7, textAlign: "center" },
});

function Detail({ label, value }: { label: string; value: string }) {
  if (!value.trim()) return null;

  return (
    <View style={styles.detail}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

export function createResumeDocument(data: ResumeFormValues): ReactElement<DocumentProps> {
  const experienceDates = [data.experienceStart, data.experienceEnd].filter(Boolean).join(" - ");
  const educationDates = [data.educationStart, data.educationEnd].filter(Boolean).join(" - ");
  const experienceTitle = [data.jobTitle, data.company].filter(Boolean).join(" | ");
  const educationTitle = [data.degree, data.institution].filter(Boolean).join(" | ");
  const projectTitle = [data.projectName, data.projectRole].filter(Boolean).join(" | ");

  return (
    <Document title={`${data.fullName} - Resume`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.name}>{data.fullName}</Text>
          <Text style={styles.role}>{data.role}</Text>
          <Text style={styles.contact}>{[data.email, data.location].filter(Boolean).join("  |  ")}</Text>
        </View>
        <View style={styles.columns}>
          <View style={styles.sidebar}>
            <Section title="Contact">
              <Detail label="Email" value={data.email} />
              <Detail label="Location" value={data.location} />
            </Section>
            <Section title="Skills">
              <Detail label="Primary skill" value={data.primarySkill} />
              <Detail label="Experience" value={data.skillLevel} />
              <Detail label="Additional skills" value={data.additionalSkills} />
              <Detail label="Tools" value={data.tools} />
            </Section>
            <Section title="Languages">
              <Detail label={data.languageLevel || "Language"} value={data.language} />
              <Detail label="Other languages" value={data.otherLanguages} />
            </Section>
          </View>
          <View style={styles.content}>
            <Section title="Profile">
              <Detail label="About" value={data.summary} />
            </Section>
            <Section title="Experience">
              <Detail label={experienceDates || "Role"} value={experienceTitle} />
              <Detail label="Responsibilities and achievements" value={data.experienceDescription} />
            </Section>
            <Section title="Education">
              <Detail label={educationDates || "Education"} value={educationTitle} />
              <Detail label="Additional details" value={data.educationDetails} />
            </Section>
            <Section title="Projects">
              <Detail label={data.projectLink || "Project"} value={projectTitle} />
              <Detail label="Description" value={data.projectDescription} />
            </Section>
          </View>
        </View>
        <Text style={styles.footer}>Created with Resume Builder</Text>
      </Page>
    </Document>
  );
}