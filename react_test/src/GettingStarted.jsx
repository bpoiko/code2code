function GettingStarted() {
  return (
    <div className="getting-started">
      <h1>👋 Getting Started with Code2Code</h1>
      <p>Choose a language below to see some quick syntax and examples:</p>
        <h1>You'll also need an IDE, I am personally liking VSCode as of recently but feel free to use what you have</h1>
      <section>
        <h2>🟨 Java</h2>
        <pre>
{`public class HelloWorld {
  public static void main(String[] args) {
    System.out.println("Hello, World!");
  }
}`}
        </pre>
      </section>

      <section>
        <h2>🟩 Python</h2>
        <p><b>I'll personally state this will be the easiest language to pickup!</b></p>
        <pre>
{`def greet():
  print("Hello, World!")

greet()`}
        </pre>
      </section>

      <section>
        <h2>🟦 C/C++</h2>
        <pre>
{`#include <stdio.h>

int main() {
  printf("Hello, World!\\n");
  return 0;
}`}
        </pre>
      </section>
    </div>
  );
}

export default GettingStarted;
