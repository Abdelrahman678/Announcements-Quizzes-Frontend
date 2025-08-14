import { useEffect, useState } from "react";
import axios from "axios";
import {
  CircularProgress,
  Container,
  Typography,
  Card,
  CardContent,
  Divider,
  Box,
} from "@mui/material";
import { useTranslation } from "react-i18next";

interface Announcement {
  _id: string;
  title: string;
  content: string;
  course: string;
  createdAt: string;
  updatedAt: string;
}

export default function Announcement() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get(
          "https://announcements-quizzes-backend.vercel.app/announcement/get-all-announcements"
        );
        console.log(response.data);
        setAnnouncements(response.data.data || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching announcements:", err);
        setError("Failed to load announcements. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  if (loading) {
    return (
      <Container
        maxWidth="md"
        style={{ display: "flex", justifyContent: "center", padding: "2rem" }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" style={{ padding: "2rem" }}>
        <Typography color="error" variant="h6">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" style={{ padding: "2rem 0" }}>
      <Typography variant="h4" gutterBottom>
        {t("Announcements")}
      </Typography>

      {announcements.length === 0 ? (
        <Typography variant="body1">
          {t("No announcements available.")}
        </Typography>
      ) : (
        announcements.map((announcement) => (
          <Card key={announcement._id} style={{ marginBottom: "1.5rem" }}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {announcement.title}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                {announcement.course} •{" "}
                {new Date(announcement.createdAt).toLocaleDateString()}
              </Typography>
              <Divider style={{ margin: "1rem 0" }} />
              <Box style={{ whiteSpace: "pre-line" }}>
                <Typography variant="body1">{announcement.content}</Typography>
              </Box>
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
}
