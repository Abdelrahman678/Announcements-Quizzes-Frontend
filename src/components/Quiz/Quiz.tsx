import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  CircularProgress,
  Container,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import { useTranslation } from "react-i18next";

interface Question {
  questionText: string;
  options: string[];
  correctAnswer: number;
}

interface Quiz {
  _id: string;
  title: string;
  course: string;
  questions: Question[];
  createdAt: string;
  updatedAt: string;
}

export default function Quiz() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get(
          "https://announcements-quizzes-backend.vercel.app/quiz/get-all-quizzes"
        );
        console.log(response.data);
        setQuizzes(response.data.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching quizzes:", err);
        setError("Failed to load quizzes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
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
        {t("Quizzes")}
      </Typography>

      {quizzes.length === 0 ? (
        <Typography variant="body1">{t("No quizzes available.")}</Typography>
      ) : (
        quizzes.map((quiz) => (
          <Card key={quiz._id} style={{ marginBottom: "1.5rem" }}>
            <CardContent>
              <Typography variant="h5" component="h2">
                {quiz.title}
              </Typography>
              <Typography color="textSecondary" gutterBottom>
                {quiz.course}
              </Typography>
              <Divider style={{ margin: "1rem 0" }} />

              <Typography variant="subtitle1" gutterBottom>
                {t("Questions")}:
              </Typography>
              <List dense>
                {quiz.questions.map((question, qIndex) => (
                  <React.Fragment key={qIndex}>
                    <ListItem>
                      <ListItemText
                        primary={`${qIndex + 1}. ${question.questionText}`}
                        secondary={
                          <span>
                            {t("Options")}: {question.options.join(", ")}
                            <br />
                          </span>
                        }
                      />
                    </ListItem>
                    {qIndex < quiz.questions.length - 1 && (
                      <Divider component="li" />
                    )}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        ))
      )}
    </Container>
  );
}
