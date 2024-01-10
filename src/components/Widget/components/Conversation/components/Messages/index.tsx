import {
  useEffect,
  useRef,
  useState,
  ElementRef,
  ImgHTMLAttributes,
  MouseEvent,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import format from "date-fns/format";

import { scrollToBottom } from "../../../../../../utils/messages";
import {
  MessageTypes,
  Link,
  CustomCompMessage,
  GlobalState,
} from "../../../../../../store/types";
import {
  setBadgeCount,
  markAllMessagesRead,
} from "../../../../../../store/actions";
import { MESSAGE_SENDER } from "../../../../../../constants";

import Loader from "./components/Loader";
import "./styles.scss";

type Props = {
  showTimeStamp: boolean;
  profileAvatar?: string;
  profileClientAvatar?: string;
  sendMessage: (event: any) => void;
};

function Messages({
  profileAvatar,
  profileClientAvatar,
  showTimeStamp,
  sendMessage,
}: Props) {
  const dispatch = useDispatch();
  const { messages, typing, showChat, badgeCount } = useSelector(
    (state: GlobalState) => ({
      messages: state.messages.messages,
      badgeCount: state.messages.badgeCount,
      typing: state.behavior.messageLoader,
      showChat: state.behavior.showChat,
    })
  );

  const messageRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    // @ts-ignore
    scrollToBottom(messageRef.current);
    if (showChat && badgeCount) dispatch(markAllMessagesRead());
    else
      dispatch(
        setBadgeCount(messages.filter((message) => message.unread).length)
      );
  }, [messages, badgeCount, showChat]);

  const getComponentToRender = (
    message: MessageTypes | Link | CustomCompMessage
  ) => {
    const ComponentToRender = message.component;
    if (message.type === "component") {
      return <ComponentToRender {...message.props} />;
    }
    return (
      <ComponentToRender message={message} showTimeStamp={showTimeStamp} />
    );
  };

  // TODO: Fix this function or change to move the avatar to last message from response
  // const shouldRenderAvatar = (message: Message, index: number) => {
  //   const previousMessage = messages[index - 1];
  //   if (message.showAvatar && previousMessage.showAvatar) {
  //     dispatch(hideAvatar(index));
  //   }
  // }

  const isClient = (sender) => sender === MESSAGE_SENDER.CLIENT;

  const [showButtons, setShowButtons] = useState(() => {
    const savedState = sessionStorage.getItem("showButtons");
    return savedState === null ? true : savedState === "true";
  });

  useEffect(() => {
    sessionStorage.setItem("showButtons", showButtons.toString());

    const handleBeforeUnload = () => {
      sessionStorage.removeItem("showButtons");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [showButtons]);

  const handlePredefinedQuestion = (question) => {
    sendMessage(question);
    setShowButtons(false);
  };

  return (
    <div id="messages" className="rcw-messages-container" ref={messageRef}>
      {messages?.map((message, index) => (
        <div
          className={`rcw-message ${
            isClient(message.sender) ? "rcw-message-client" : ""
          }`}
          key={`${index}-${format(message.timestamp, "hh:mm")}`}
        >
          {((profileAvatar && !isClient(message.sender)) ||
            (profileClientAvatar && isClient(message.sender))) &&
            message.showAvatar && (
              <img
                src={
                  isClient(message.sender) ? profileClientAvatar : profileAvatar
                }
                className={`rcw-avatar ${
                  isClient(message.sender) ? "rcw-avatar-client" : ""
                }`}
                alt="profile"
              />
            )}
          {getComponentToRender(message)}
        </div>
      ))}
      {showButtons && (
        <div className="ready-questions">
          <button
            onClick={() =>
              handlePredefinedQuestion("What will I learn in this course?")
            }
            className="question"
          >
            What will I learn in this course?
          </button>
          <button
            onClick={() =>
              handlePredefinedQuestion(
                "Can I get certificate after finishing course?"
              )
            }
            className="question"
          >
            Is there a certificate after the course?
          </button>
          <button
            onClick={() =>
              handlePredefinedQuestion(
                "What are the prerequisites for this course?"
              )
            }
            className="question"
          >
            What are the course prerequisites?
          </button>
        </div>
      )}

      <Loader typing={typing} />
    </div>
  );
}

export default Messages;
