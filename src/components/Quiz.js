function Quiz(props) {

    const mappedQuestions = props.allQuestions.map((question, index) => {
    
        const mappedAnswers = props.allAnswers[index].map(answer => {

            const styles = {
                backgroundColor : answer.selected ? "grey" : "white"
            }

            return (
                <button 
                    className="Answers" 
                    onClick={() => props.selectAnswer(index, answer.id)}
                    key={answer.id}
                    style={styles}
                >
                    {answer.answer.replace(/[^a-zA-Z ]/g, "")}
                </button>
            )
        })
    
        return (
            <div key={index}>
                <h3>{question}</h3>
                {mappedAnswers}
            </div>
        )
    })

    return(
        <div>
            Quiz
            {mappedQuestions}
        </div>
    )
}

export default Quiz;