import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Box,
  Divider,
  CircularProgress,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface Quiz {
  _id: string;
  title: string;
  course: string;
  createdAt: string;
  questions: Array<{
    questionText: string;
    options: string[];
    correctAnswer: number;
  }>;
}

interface Announcement {
  _id: string;
  title: string;
  content: string;
  course: string;
  createdAt: string;
}

export default function Dashboard() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch quizzes
        const quizzesResponse = await axios.get(
          "https://announcements-quizzes-backend.vercel.app/quiz/get-all-quizzes"
        );

        // Fetch announcements
        const announcementsResponse = await axios.get(
          "https://announcements-quizzes-backend.vercel.app/announcement/get-all-announcements"
        );

        // Sort by date and take the 3 most recent
        const sortedQuizzes = [...(quizzesResponse.data.data || [])]
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 3);

        const sortedAnnouncements = [...(announcementsResponse.data.data || [])]
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 3);

        setQuizzes(sortedQuizzes);
        setAnnouncements(sortedAnnouncements);
        setError(null);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <Container
        style={{ display: "flex", justifyContent: "center", padding: "2rem" }}
      >
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container style={{ padding: "2rem" }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" style={{ padding: "2rem 0" }}>
      <Typography variant="h4" gutterBottom>
        {t("Dashboard")}
      </Typography>

      <Box sx={{ width: "100%" }}>
        <Box sx={{ mb: 4 }}>
          <Card elevation={3}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={2}
            >
              <Typography variant="h6" component="h2">
                {t("Recent Announcements")}
              </Typography>
              <Button
                variant="text"
                color="primary"
                onClick={() => navigate("/announcements")}
                size="small"
              >
                {t("View All")}
              </Button>
            </Box>
            <Divider />
            <CardContent>
              {announcements.length > 0 ? (
                announcements.map((announcement) => (
                  <Box key={announcement._id} mb={3}>
                    <Typography variant="subtitle1" color="primary">
                      {announcement.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      gutterBottom
                    >
                      {announcement.course} •{" "}
                      {formatDate(announcement.createdAt)}
                    </Typography>
                    <Typography
                      variant="body2"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {announcement.content.length > 100
                        ? `${announcement.content.substring(0, 100)}...`
                        : announcement.content}
                    </Typography>
                    <Divider style={{ marginTop: "1rem" }} />
                  </Box>
                ))
              ) : (
                <Typography variant="body2" color="textSecondary">
                  {t("No recent announcements")}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Box>

        <Box>
          <Card elevation={3}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={2}
            >
              <Typography variant="h6" component="h2">
                {t("Recent Quizzes")}
              </Typography>
              <Button
                variant="text"
                color="primary"
                onClick={() => navigate("/quizzes")}
                size="small"
              >
                {t("View All")}
              </Button>
            </Box>
            <Divider />
            <CardContent>
              {quizzes.length > 0 ? (
                quizzes.map((quiz) => (
                  <Box key={quiz._id} mb={3}>
                    <Typography variant="subtitle1" color="primary">
                      {quiz.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      gutterBottom
                    >
                      {quiz.course} • {formatDate(quiz.createdAt)} •{" "}
                      {quiz.questions.length} questions
                    </Typography>
                    <Typography variant="body2">
                      {quiz.questions[0]?.questionText?.substring(0, 100)}
                      {quiz.questions[0]?.questionText?.length > 100
                        ? "..."
                        : ""}
                    </Typography>
                    <Divider style={{ marginTop: "1rem" }} />
                  </Box>
                ))
              ) : (
                <Typography variant="body2" color="textSecondary">
                  {t("No recent quizzes")}
                </Typography>
              )}
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Container>
  );
}
