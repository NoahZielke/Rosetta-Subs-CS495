# The purpose of each test is defined in a comment above the test
# To run this file along with any other Pytests, simply run 'pytest' (no quotes)

import sys
sys.path.append("../backend")
import srtUtils


# Verify/prove type and value of the output of newPhrase()
def test_newPhrase():
    assert type(srtUtils.newPhrase()) is dict
    assert srtUtils.newPhrase() == { 'start_time': '', 'end_time': '', 'words' : [] }


# Verify/prove formatting and value of the output of getTimeCode()
# Note: Function is accurate to centiseconds
def test_getTimeCode():
    assert srtUtils.getTimeCode(.01) == "00:00:00,010"
    assert srtUtils.getTimeCode(.1) == "00:00:00,100"
    assert srtUtils.getTimeCode(1) == "00:00:01,000"
    assert srtUtils.getTimeCode(10) == "00:00:10,000"
    assert srtUtils.getTimeCode(60) == "00:01:00,000"
    assert srtUtils.getTimeCode(600) == "00:10:00,000"
    assert srtUtils.getTimeCode(3600) == "01:00:00,000"
    assert srtUtils.getTimeCode(36000) == "10:00:00,000"
    assert srtUtils.getTimeCode(40271.110) == "11:11:11,110"
    assert srtUtils.getTimeCode(80542.220) == "22:22:22,220"


# Provide example of the transcript JSON file layout currently returned by AWS Transcribe
# Verify/prove the format and values of the phrase list items that are returned by getPhrasesFromTranscript()
def test_getPhrasesFromTranscript():
    phrases = srtUtils.getPhrasesFromTranscript('''
        {
            "jobName":"testjob",
            "accountId":"123456",
            "results": {
                "transcripts":
                    [{"transcript":"Adding the bit of DNA code that you need for bioluminescence."}],
                "items":
                    [
                        {"start_time":"0.0","end_time":"0.41","alternatives":[{"confidence":"1.0","content":"Adding"}],"type":"pronunciation"},
                        {"start_time":"0.42","end_time":"0.54","alternatives":[{"confidence":"0.7907","content":"the"}],"type":"pronunciation"},
                        {"start_time":"0.54","end_time":"0.82","alternatives":[{"confidence":"0.8712","content":"bit"}],"type":"pronunciation"},
                        {"start_time":"0.83","end_time":"1.01","alternatives":[{"confidence":"1.0","content":"of"}],"type":"pronunciation"},
                        {"start_time":"1.01","end_time":"1.41","alternatives":[{"confidence":"0.9965","content":"DNA"}],"type":"pronunciation"},
                        {"start_time":"1.41","end_time":"1.71","alternatives":[{"confidence":"0.9992","content":"code"}],"type":"pronunciation"},
                        {"start_time":"1.71","end_time":"1.83","alternatives":[{"confidence":"1.0","content":"that"}],"type":"pronunciation"},
                        {"start_time":"1.83","end_time":"1.95","alternatives":[{"confidence":"1.0","content":"you"}],"type":"pronunciation"},
                        {"start_time":"1.95","end_time":"2.29","alternatives":[{"confidence":"1.0","content":"need"}],"type":"pronunciation"},
                        {"start_time":"2.3","end_time":"2.75","alternatives":[{"confidence":"1.0","content":"for"}],"type":"pronunciation"},
                        {"start_time":"2.75","end_time":"3.91","alternatives":[{"confidence":"1.0","content":"bioluminescence"}],"type":"pronunciation"},
                        {"alternatives":[{"confidence":"0.0","content":"."}],"type":"punctuation"}
                    ]
            },
            "status":"COMPLETED"
        }
    ''')

    assert(phrases[0] == {'start_time': '00:00:00,000', 'end_time': '00:00:02,750', 'words': ['Adding', 'the', 'bit', 'of', 'DNA', 'code', 'that', 'you', 'need', 'for']})
    assert(phrases[1]) == {'start_time': '00:00:02,750', 'end_time': '00:00:03,910', 'words': ['bioluminescence', '.']}


# Verify/prove the format of phrases
# Verify that the words list can be retrieved and combined into a string that has the proper value
def test_getPhraseText():
    phrases = srtUtils.getPhrasesFromTranscript('''
        {
            "jobName":"testjob",
            "accountId":"123456",
            "results": {
                "transcripts":
                    [{"transcript":"Adding the bit of DNA code that you need for bioluminescence."}],
                "items":
                    [
                        {"start_time":"0.0","end_time":"0.41","alternatives":[{"confidence":"1.0","content":"Adding"}],"type":"pronunciation"},
                        {"start_time":"0.42","end_time":"0.54","alternatives":[{"confidence":"0.7907","content":"the"}],"type":"pronunciation"},
                        {"start_time":"0.54","end_time":"0.82","alternatives":[{"confidence":"0.8712","content":"bit"}],"type":"pronunciation"},
                        {"start_time":"0.83","end_time":"1.01","alternatives":[{"confidence":"1.0","content":"of"}],"type":"pronunciation"},
                        {"start_time":"1.01","end_time":"1.41","alternatives":[{"confidence":"0.9965","content":"DNA"}],"type":"pronunciation"},
                        {"start_time":"1.41","end_time":"1.71","alternatives":[{"confidence":"0.9992","content":"code"}],"type":"pronunciation"},
                        {"start_time":"1.71","end_time":"1.83","alternatives":[{"confidence":"1.0","content":"that"}],"type":"pronunciation"},
                        {"start_time":"1.83","end_time":"1.95","alternatives":[{"confidence":"1.0","content":"you"}],"type":"pronunciation"},
                        {"start_time":"1.95","end_time":"2.29","alternatives":[{"confidence":"1.0","content":"need"}],"type":"pronunciation"},
                        {"start_time":"2.3","end_time":"2.75","alternatives":[{"confidence":"1.0","content":"for"}],"type":"pronunciation"},
                        {"start_time":"2.75","end_time":"3.91","alternatives":[{"confidence":"1.0","content":"bioluminescence"}],"type":"pronunciation"},
                        {"alternatives":[{"confidence":"0.0","content":"."}],"type":"punctuation"}
                    ]
            },
            "status":"COMPLETED"
        }
    ''')
    
    assert(srtUtils.getPhraseText(phrases[0]) == "Adding the bit of DNA code that you need for")
    assert(srtUtils.getPhraseText(phrases[1]) == "bioluminescence.")


# Provide an example of what the generated SRT file will look like
# Verify/prove the format and values of the SRT file generated by writeSRT()
def test_writeSRT(tmpdir):
    phrases = srtUtils.getPhrasesFromTranscript('''
        {
            "jobName":"testjob",
            "accountId":"123456",
            "results": {
                "transcripts":
                    [{"transcript":"Adding the bit of DNA code that you need for bioluminescence."}],
                "items":
                    [
                        {"start_time":"0.0","end_time":"0.41","alternatives":[{"confidence":"1.0","content":"Adding"}],"type":"pronunciation"},
                        {"start_time":"0.42","end_time":"0.54","alternatives":[{"confidence":"0.7907","content":"the"}],"type":"pronunciation"},
                        {"start_time":"0.54","end_time":"0.82","alternatives":[{"confidence":"0.8712","content":"bit"}],"type":"pronunciation"},
                        {"start_time":"0.83","end_time":"1.01","alternatives":[{"confidence":"1.0","content":"of"}],"type":"pronunciation"},
                        {"start_time":"1.01","end_time":"1.41","alternatives":[{"confidence":"0.9965","content":"DNA"}],"type":"pronunciation"},
                        {"start_time":"1.41","end_time":"1.71","alternatives":[{"confidence":"0.9992","content":"code"}],"type":"pronunciation"},
                        {"start_time":"1.71","end_time":"1.83","alternatives":[{"confidence":"1.0","content":"that"}],"type":"pronunciation"},
                        {"start_time":"1.83","end_time":"1.95","alternatives":[{"confidence":"1.0","content":"you"}],"type":"pronunciation"},
                        {"start_time":"1.95","end_time":"2.29","alternatives":[{"confidence":"1.0","content":"need"}],"type":"pronunciation"},
                        {"start_time":"2.3","end_time":"2.75","alternatives":[{"confidence":"1.0","content":"for"}],"type":"pronunciation"},
                        {"start_time":"2.75","end_time":"3.91","alternatives":[{"confidence":"1.0","content":"bioluminescence"}],"type":"pronunciation"},
                        {"alternatives":[{"confidence":"0.0","content":"."}],"type":"punctuation"}
                    ]
            },
            "status":"COMPLETED"
        }
    ''')
    file = tmpdir.join('noah.srt')
    srtUtils.writeSRT(phrases, str(file))
    assert file.read() == (
        "1\n"
        "00:00:00,000 --> 00:00:02,750\n"
        "Adding the bit of DNA code that you need for\n\n"

        "2\n"
        "00:00:02,750 --> 00:00:03,910\n"
        "bioluminescence.\n\n"
    )   # note -> could use triple quotes here but this was more visually appealing


