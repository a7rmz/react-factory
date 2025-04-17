
import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import App from "./App"

describe("Tic Tae Toe", () => {
    test("renders correctly", () => {
        render(<App />)

        expect(screen.getAllByRole("button")).toHaveLength(9)
    })

    test("player X turn", () => {
        render(<App />)

        expect(screen.getByText("Next player: X")).toBeInTheDocument()
    })

    test("player O turn", async () => {
        render(<App />)

        await userEvent.click(screen.getAllByRole("button")[0]) // Player X

        expect(screen.getByText("Next player: O")).toBeInTheDocument()
    })

    test("players can play", async () => {
        render(<App />)

        const squares = screen.getAllByRole("button")

        expect(squares[0]).toHaveTextContent("")
        expect(squares[1]).toHaveTextContent("")

        await userEvent.click(squares[0]) // Player X
        await userEvent.click(squares[1]) // Player O

        expect(squares[0]).toHaveTextContent("X")
        expect(squares[1]).toHaveTextContent("O")
    })

    test("players can not play a played square", async () => {
        render(<App />)

        const squares = screen.getAllByRole("button")

        await userEvent.click(squares[0]) // Player X
        await userEvent.click(squares[0]) // Player O

        expect(squares[0]).toHaveTextContent("X") // still X
    })

    test("player X wins", async () => {
        render(<App />)

        const squares = screen.getAllByRole("button")
        //  -----------
        // | x | o |   |
        //  -----------
        // | o | x |   |
        //  -----------
        // |   |   | x |
        //  -----------
        await userEvent.click(squares[0]) // Player X
        await userEvent.click(squares[1]) // Player O
        await userEvent.click(squares[4]) // Player X
        await userEvent.click(squares[3]) // Player O
        await userEvent.click(squares[8]) // Player X

        expect(screen.getByText("Winner: X")).toBeInTheDocument()
    })

    test("player O wins", async () => {
        render(<App />)

        const squares = screen.getAllByRole("button")
        //  -----------
        // | x |   | o |
        //  -----------
        // | o | o | x |
        //  -----------
        // | o | x | x |
        //  -----------
        await userEvent.click(squares[0]) // Player X
        await userEvent.click(squares[4]) // Player O
        await userEvent.click(squares[8]) // Player X
        await userEvent.click(squares[3]) // Player O
        await userEvent.click(squares[5]) // Player X
        await userEvent.click(squares[2]) // Player O
        await userEvent.click(squares[7]) // Player X
        await userEvent.click(squares[6]) // Player O

        expect(screen.getByText("Winner: O")).toBeInTheDocument()
    })

    test("game over", async () => {
        render(<App />)

        const squares = screen.getAllByRole("button")
        //  -----------
        // | o | x | o |
        //  -----------
        // | x | x | o |
        //  -----------
        // | x | o | x |
        //  -----------
        await userEvent.click(squares[4]) // Player X
        await userEvent.click(squares[0]) // Player O
        await userEvent.click(squares[6]) // Player X
        await userEvent.click(squares[2]) // Player O
        await userEvent.click(squares[1]) // Player X
        await userEvent.click(squares[7]) // Player O
        await userEvent.click(squares[3]) // Player X
        await userEvent.click(squares[5]) // Player O
        await userEvent.click(squares[8]) // Player X

        expect(screen.getByText("Game over")).toBeInTheDocument()
    })
})