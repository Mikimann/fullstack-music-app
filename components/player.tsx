import {
  ButtonGroup,
  Box,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderTrack,
  RangeSliderThumb,
  Center,
  Flex,
  Text,
} from "@chakra-ui/react";
import ReactHowler from "react-howler";
import { useEffect, useRef, useState } from "react";
import {
  MdShuffle,
  MdSkipPrevious,
  MdPrevious,
  MdSkipNext,
  MdOutlinePlayCircleFilled,
  MdOutlinePauseCircleFilled,
  MdOutlineRepeat,
} from "react-icons/md";
import { useStoreActions } from "easy-peasy";
import { formatTime } from "lib/formatters";

const Player = ({ songs, activeSong }) => {
  // keep track of wheter is playing or not. When this components loads up it will automatically start playing
  const [playing, setPlaying] = useState(true);
  // keep track of what song is currently playing
  const [index, setIndex] = useState(0);
  // keep track of seek value on the bar
  const [seek, setSeek] = useState(0.0);
  // keep track if the user is seeking or not
  const [isSeeking, setIsSeeking] = useState(false);
  // keep track of repeating
  const [repeat, setRepeat] = useState(false);
  // keep track of shuffle
  const [shuffle, setShuffle] = useState(false);
  // keep track of song duration
  const [duration, setDuration] = useState(0.0);
  // reference object that is going be attached to React howler component, in order to sync with the song status bar
  const soundRef = useRef(null);

  // useEffect hook that tracks the playing state and isSeeking state
  // if the music is currently playing and the user is not currently seeking then request an animation frame which
  // updates the UI to whatever the soundRef.current.seek is.
  useEffect(() => {
    let timerId;

    if (playing && !isSeeking) {
      // recursive function
      const f = () => {
        setSeek(soundRef.current.seek());
        timerId = requestAnimationFrame(f);
      };

      timerId = requestAnimationFrame(f);
      // cleanup function
      return () => cancelAnimationFrame(timerId);
    }
    // if the conditional is initially false cancel the animation frame as well with the timerId
    cancelAnimationFrame(timerId);
  }, [playing, isSeeking]);

  const setPlayState = (value) => {
    setPlaying(value);
  };

  const onShuffle = () => {
    // use a callback if you need the current state to set the next version of the state.
    // That`s because setting state is asynchronous and you`re never guaranteed to have the current state at
    // the time if you`re trying to use it to set the next state, hence the callback.
    setShuffle((state) => !state);
  };

  const onRepeat = () => {
    setRepeat((state) => !state);
  };

  const onSkipPrevious = () => {
    setIndex((state) => {
      // if current index is > 0 then subtract 1 from it, if it is 0 then go to the end of the playlist and play the song at the end
      return state ? state - 1 : songs.length - 1;
    });
  };

  const onSkipNext = () => {
    setIndex((state) => {
      if (shuffle) {
        // use recursion
        const next = Math.floor(Math.random() * songs.length);

        if (next === state) {
          return onSkipNext();
        }
        return next;
      }
      // if state equals last thing in the array then reset back to 0 if not then just return that index +1
      return state === songs.length - 1 ? 0 : state + 1;
    });
  };

  // handler for when the song ends.
  const onEnd = () => {
    // count for repeat on song end, so it loops back and plays the song again
    if (repeat) {
      // update the UI bar to restart, sets it to 0
      setSeek(0);
      // sets the song  back to 0, resets it.
      soundRef.current.seek(0);
    } else {
      onSkipNext();
    }
  };
  // when a song loads up, it grabs the duration from it and set it to show it in the player at the bottom right
  const onLoad = () => {
    const songDuration = soundRef.current.duration();
    setDuration(songDuration);
  };

  // handle the visual seek bar on click/drag
  const onSeek = (event) => {
    setSeek(parseFloat(event[0]));
    // handle the song seek
    soundRef.current.seek(event[0]);
  };

  return (
    // React Howler is a wrapper for howler.js. It allows using howler in React, which in turn makes it easier to use the browser audio api
    <Box>
      <Box>
        <ReactHowler
          playing={playing}
          src={activeSong?.url}
          ref={soundRef}
          onLoad={onLoad}
          onEnd={onEnd}
        />
      </Box>
      <Center color="gray.600">
        <ButtonGroup>
          <IconButton
            outline="none"
            variant="link"
            aria-label="shuffle"
            fontSize="24px"
            icon={<MdShuffle />}
            color={shuffle ? "white" : "gray.600"}
            onClick={() => onShuffle()}
          />
          <IconButton
            outline="none"
            variant="link"
            aria-label="skip"
            fontSize="24px"
            icon={<MdSkipPrevious />}
            onClick={onSkipPrevious}
          />
          {playing ? (
            <IconButton
              outline="none"
              variant="link"
              aria-label="pause"
              fontSize="40px"
              color="white"
              icon={<MdOutlinePauseCircleFilled />}
              onClick={() => setPlayState(false)}
            />
          ) : (
            <IconButton
              outline="none"
              variant="link"
              aria-label="play"
              fontSize="40px"
              color="white"
              icon={<MdOutlinePlayCircleFilled />}
              onClick={() => setPlayState(true)}
            />
          )}

          <IconButton
            outline="none"
            variant="link"
            aria-label="next"
            fontSize="24px"
            icon={<MdSkipNext />}
            onClick={onSkipNext}
          />
          <IconButton
            outline="none"
            variant="link"
            aria-label="repeat"
            fontSize="24px"
            icon={<MdOutlineRepeat />}
            color={repeat ? "white" : "gray.600"}
            onClick={() => onRepeat()}
          />
        </ButtonGroup>
      </Center>
      <Box color="gray.600">
        <Flex justify="center" align="center">
          <Box width="10%">
            <Text fontSize="xs">{formatTime(seek)}</Text>
          </Box>
          <Box width="80%">
            <RangeSlider
              aria-label={["min", "max"]}
              step={0.1}
              min={0}
              max={duration ? duration.toFixed(2) : 0}
              id="player-range"
              onChange={onSeek}
              value={[seek]}
              onChangeStart={() => setIsSeeking(true)}
              onChangeEnd={() => setIsSeeking(false)}
            >
              <RangeSliderTrack bg="gray.800">
                <RangeSliderFilledTrack bg="gray.600" />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>
          <Box width="10%" textAlign="right">
            <Text fontSize="xs">{formatTime(duration)}</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Player;
