---
author: "Peter Yaacoub"
has_repo: true
layout: "article"
title: "One SwiftUI App, Six Architectures"
---
  
## Introduction  
  
What's the best architecture for SwiftUI? This question always sparks endless debate in the iOS development community. Today, I finally decided to cut through the theory by building a simple task manager app six times. Yes, you read it right: SIX times. One app, six different architectures.  
  
First things first, I’m no architecture expert, and I’ll never pretend to be one. If you find mistakes or disagree with my following methods, reasoning, or learning, I’ll be happy to get your feedback via email or social media. For most of the following, it will be my first time dabbling in, so be indulgent!  
  
To start this new journey, I began with an initial list of 12 candidates. After realizing that many overlapped, I instead turned my focus to the ones that felt the most interesting and popular to me. I'm not hiding the fact that I used AI assistants to help clarify each architecture’s philosophy and implementation. With their strengths, some offering strong starting points, others distinguishing subtle differences, and IDE-integrated AI helping with debugging, I was ready to compare these options head-to-head.  

## What's the difference between architecture and design patterns?  
  
The terms are often used interchangeably, including in this article, but there's a subtle distinction worth understanding.  
  
Design patterns solve specific code challenges: ensuring a single existing instance (Singleton), notifying multiple objects of changes (Observer)… In contrast, architectural patterns refer to the high-level organization of the entire application: its data, business logic, navigation handling,…

An architecture like MVVM uses the Observer pattern for data binding, and a Clean Architecture might use Repository and Factory patterns for data access. 
  
Now that this is out of the way, let's build the same task manager six different ways, ordered by a progression that felt logical as I learned.  
  
## Model-View-Controller (MVC)  
  
MVC was invented by Trygve Reenskaug at the Xerox Palo Alto Research Center in the late 70s for Smalltalk, making it one of the oldest architectural patterns in software development. The name simply describes its three core components: **Model** (data), **View** (UI), and **Controller** (logic coordinator).  
  
Apple embraced MVC as the primary pattern for both macOS and iOS development, deeply integrating it into UIKit with `UIViewController`. It remained dominant throughout the 2010s, though it was criticized for producing "Massive View Controllers" in complex apps. This is caused by Apple's tight coupling of Views and Controllers, unlike classical MVC, where both are peers. Even though it still plays a role in older and hybrid codebases, MVC is less prominent today due to SwiftUI’s declarative approach.

So, is MVC still compatible with SwiftUI? You'll get the answer to that question in just a few minutes!
  
### File structure  
  
```
MVC/
├── MVCApp.swift
├── 1 - Models/
│   └── Task.swift
├── 2 - Views/
│   └── TaskListView.swift
└── 3 - Controllers/
    └── TaskController.swift

```
  
The structure is straightforward: Models define data, Views display the UI, and Controllers coordinate between them. In this simple task manager, all logic resides in the `TaskController`, which the View observes for state changes, enabling the UI to automatically update when the underlying data is modified.  
  
### Implementation  
  
Well, actually, there's no implementation. When I initially wrote the code for this part, it really looked like MVVM, and I didn't understand why or even the difference between the two. It's only after a lot of research that I finally understood.

In MVC, the Controller holds references to Views and controls their layout. This supposes that Views are classes, which is not the case in SwiftUI. It also implies that Views are actual views, and always. Not a set of either layout constraints, layers, or views. Just views. 
  
## Model-View-ViewModel (MVVM)  
  
MVVM was created by Microsoft architects John Gossman and Ken Cooper around 2005 for WPF (Windows Presentation Foundation) and Silverlight. The **ViewModel** sits as the mediator between the View and Model, exposing data and commands in a View-friendly format.  
  
MVVM gained serious traction in the iOS community around 2015 with the rise of Swift 2 and reactive programming. It then truly took off with SwiftUI's launch. Currently, MVVM is the most common baseline architecture for SwiftUI apps, especially for small to medium-sized projects. It's often the recommended approach and feels natural with SwiftUI's declarative syntax and reactive nature.  
  
### File structure  

Almost identical to MVC's structure, here the ViewModel replaces the Controller.  
  
```
MVVM/
├── MVVMApp.swift
├── 1 - Models/
│   └── Task.swift
├── 2 - Views/
│   └── TaskListView.swift
└── 3 - ViewModels/
    └── TaskListViewModel.swift

```

### Implementation  

In MVVM, the ViewModel exposes observable properties that the View binds to. The View automatically updates itself through these bindings. The ViewModel doesn't "control" the View; it just tells it that a change was made. 

Tasks.swift:  
```swift
import Foundation

struct Task: Identifiable {
    let id: UUID = UUID()
    var title: String
    var isDone: Bool = false
}

```
  
TaskListView.swift:  
```swift
import SwiftUI

struct TaskListView: View {
    @State private var viewModel = TaskListViewModel()
    
    var body: some View {
        NavigationStack {
            VStack {
                HStack {
                    TextField("Enter a new task…", text: $viewModel.taskTitle)
                        .textFieldStyle(.roundedBorder)
                        .padding(.trailing)
                    Button("Add", action: viewModel.addTask)
                        .buttonStyle(.borderedProminent)
                }
                .padding()
                
                List {
                    ForEach(viewModel.tasks) { task in
                        HStack {
                            Text(task.title)
                            Spacer()
                            Button(task.isDone ? "✓" : "○") {
                                viewModel.toggleTask(task.id)
                            }
                        }
                    }
                    .onDelete(perform: viewModel.deleteTask)
                }
                .listStyle(.plain)
            }
            .navigationTitle("Tasks")
        }
    }
}

```
  
TaskListViewModel.swift:  
```swift
import Foundation
import Observation

@Observable
final class TaskListViewModel {
    private(set) var tasks: [Task] = []
    var taskTitle: String = ""
    
    func addTask() {
        guard !taskTitle.isEmpty else { return }
        let task = Task(title: taskTitle)
        tasks.append(task)
        taskTitle = ""
    }
    
    func toggleTask(_ id: UUID) {
        guard let index = tasks.firstIndex(where: { $0.id == id }) else { return }
        tasks[index].isDone.toggle()
    }
    
    func deleteTask(_ indexSet: IndexSet) {
        for index in indexSet {
            tasks.remove(at: index)
        }
    }
}

```
  
## Model-View-ViewModel + Combine (MVVM)  
  
Ok, I cheated… this isn't a separate architecture, but I just wanted to show that this was once the norm in SwiftUI. This pattern is MVVM implemented with reactive streams. **Combine** is Apple's reactive programming framework, announced at WWDC 2019 alongside SwiftUI. It brought first-party support for reactive patterns that previously required third-party libraries like RxSwift. The name "Combine" actually refers to its ability to combine, transform, and react to asynchronous streams of values over time, all features not demonstrated in this simple example.  
  
Introduced in 2023, SwiftUI's @Observable macro has reduced the need for Combine in simple data flows and MVVM. However, Combine remains widely adopted for complex data flows, networking, timers, and multi-source data streams. One doesn't always replace the other. Observable is for basic state, and Combine is for complex async operations.  
  
### File structure  

Identical structure to standard MVVM. The difference stands entirely on how the ViewModel publishes changes.  
  
```
MVVM/
├── MVVMApp.swift
├── 1 - Models/
│   └── Task.swift
├── 2 - Views/
│   └── TaskListView.swift
└── 3 - ViewModels/
    └── TaskListViewModel.swift

```
  
### Implementation  
  
TaskListView.swift:  
```swift
// ...
@StateObject private var viewModel = TaskListViewModel()
// ...

```
  
TaskListViewModel.swift:  
```swift
import Foundation
import Combine

final class TaskListViewModel: ObservableObject {
    @Published private(set) var tasks: [Task] = []
    @Published var taskTitle: String = ""
    
    // ...
}

```
  
## The Composable Architecture (TCA)  
  
TCA was created by Brandon Williams and Stephen Celis of Point-Free around 2020. It's heavily inspired by the **Elm** Architecture (2012) and **Redux** (2015), bringing functional, unidirectional data flow to SwiftUI. The name emphasizes **composability**: the ability to break down features into independent, testable, and reusable components that compose together seamlessly.  
  
This architecture is gaining momentum in the SwiftUI community, especially for complex apps requiring predictable state management. It's become the go-to choice for teams wanting strict architectural guarantees.  
  
As stated, TCA draws inspiration from Elm’s message-driven architecture and Redux’s single-source-of-truth model, adapted to Swift. It’s also similar to ReactorKit, an RxSwift-based and imperative architecture. All share core principles: single source of truth, unidirectional data flow, and pure reducers. Unidirectional data flow means data moves in one direction through the application: **Actions → Reducer → State → View**, and the chain repeats. Unlike bidirectional patterns where Views might directly modify state (creating unpredictable behavior), unidirectional flow enforces that strict path.  
  
TCA's completeness comes with a steep learning curve. Its implementation requires an external Swift Package, and the architecture was the hardest to implement. **The idea, for large projects at least, is that you sacrifice initial development speed for long-term maintainability and correctness**. For my quick task manager, TCA is way overkill. For a banking app with 50 features and 10 developers, TCA prevents chaos, hidden side effects, and race conditions.   
  
### File structure  

TCA organizes code by features rather than technical layers. Each feature is self-contained with its State, Action, Reducer, and View bundled together. The `Domain` folder holds shared models used across features.  
  
```
TCA/
├── TCAApp.swift
├── Domain/
│   └── Task.swift
└── Features/
    └── TaskList/
        ├── TaskListFeature.swift
        └── TaskListView.swift

```
  
### Implementation  
  
TaskListFeature.swift:  
```swift
import Foundation
import ComposableArchitecture

@Reducer
struct TaskListFeature: Reducer {
    @ObservableState
    struct State {
        var tasks: IdentifiedArrayOf<Task> = []
        var taskTitle: String = ""
    }
    
    enum Action: BindableAction {
        case binding(BindingAction<State>)
        case addTask
        case toggleTask(UUID)
        case deleteTask(IndexSet)
    }
    
    var body: some Reducer<State, Action> {
        BindingReducer()
        Reduce { state, action in
            switch action {
            case .binding:
                return .none
                
            case .addTask:
                let task = Task(title: state.taskTitle)
                state.tasks.append(task)
                state.taskTitle = ""
                return .none
                
            case .toggleTask(let id):
                guard let id = state.tasks.firstIndex(where: { $0.id == id }) else { return .none }
                state.tasks[id].isDone.toggle()
                return .none
                
            case .deleteTask(let indexSet):
                state.tasks.remove(atOffsets: indexSet)
                return .none
            }
        }
    }
}

```
  
TaskListView.swift:  
```swift
import SwiftUI
import ComposableArchitecture

struct TaskListView: View {
    @Bindable var store: StoreOf<TaskListFeature>
    
    var body: some View {
        NavigationStack {
            VStack {
                HStack {
                    TextField("Enter a new task…", text: $store.taskTitle)
                        .textFieldStyle(.roundedBorder)
                        .padding(.trailing)
                    Button("Add") {
                        store.send(.addTask)
                    }
                    .buttonStyle(.borderedProminent)
                }
                .padding()
                
                List {
                    ForEach(store.tasks) { task in
                        HStack {
                            Text(task.title)
                            Spacer()
                            Button(task.isDone ? "✓" : "○") {
                                store.send(.toggleTask(task.id))
                            }
                        }
                    }
                    .onDelete { indexSet in
                        store.send(.deleteTask(indexSet))
                    }
                }
                .listStyle(.plain)
            }
            .navigationTitle("Tasks")
        }
    }
}

```
  
TCAApp.swift:  
```swift
import SwiftUI
import ComposableArchitecture

@main
struct TCAApp: App {
    static let store = Store(initialState: TaskListFeature.State()) {
        TaskListFeature()
    }
    
    var body: some Scene {
        WindowGroup {
            TaskListView(store: TCAApp.store)
        }
    }
}

```
  
## View-Interactor-Presenter-Entity-Router (VIPER)  
  
VIPER was introduced by Mutual Mobile in 2014 as an application of Clean Architecture principles to iOS. The acronym describes its five components: **View** (UI), **Interactor** (business logic), **Presenter**(presentation logic), **Entity** (business models), and **Router** (navigation).  
  
It gained significant popularity in the first years of Swift as iOS projects grew larger and developers sought alternatives to "Massive View Controller" syndrome. In fact, it makes the code highly modular with clear, strict separation of concerns. Today, VIPER is still used in legacy codebases using UIKit's imperative paradigm and by teams already familiar with it. The pattern's complexity feels at odds with SwiftUI's declarative simplicity.  
  
Another popular but similar alternative is **Clean Swift** or **VIP** (View-Interactor-Presenter). It works just like VIPER but with a one-way data flow. It also uses Workers for external services and emphasizes scenes over features. There's also Uber's **RIBs** (Router-Interactor-Builder), a reactive cross-platform architecture that structures apps as a hierarchy of features. It includes Builders for dependency injection and was designed for cross-platform teams (iOS/Android).  
  
### File structure  

VIPER organizes by modules (features), with each module containing all five VIPER components. The `TaskListModule.swift` file acts as an assembly point, wiring all components together. `TaskListInterface.swift` contains the protocols that define how components communicate.  
  
```
VIPER/
├── VIPERApp.swift
└── Modules/
    ├── Entities/
    │   └── Task.swift
    └── TaskList/
        ├── TaskListModule.swift
        ├── TaskListInterface.swift
        ├── TaskListView.swift
        ├── TaskListPresenter.swift
        ├── TaskListInteractor.swift
        └── TaskListRouter.swift

```
  
### Implementation  
  
TaskListModule.swift:  
```swift
import SwiftUI

struct TaskListModule {
    static func build() -> some View {
        let interactor = TaskListInteractor()
        let router = TaskListRouter()
        let presenter = TaskListPresenter(interactor: interactor, router: router)
        return TaskListView(presenter: presenter)
    }
}

```
  
TaskListInterface.swift:  
```swift
import Foundation
import Combine

// View -> Presenter
protocol TaskListPresenterProtocol: ObservableObject {
    var tasks: [Task] { get }
    var taskTitle: String { get set }
    
    func addTask()
    func toggleTask(_ id: UUID)
    func deleteTask(_ indexSet: IndexSet)
    func didSelectTaskDetails(task: Task)
}

// Presenter -> Interactor
protocol TaskListInteractorProtocol {
    func fetchTasks() -> [Task]
    func saveTask(_ task: Task)
    func updateTask(_ task: Task)
    func deleteTasks(_ tasks: [Task])
}

// Presenter -> Router
protocol TaskListRouterProtocol {
    func navigateToDetails(for task: Task)
}

```
  
TaskListView.swift:  
```swift
import SwiftUI

struct TaskListView<Presenter: TaskListPresenterProtocol>: View {
    @StateObject var presenter: Presenter
    
    var body: some View {
        NavigationStack {
            VStack {
                HStack {
                    TextField("Enter a new task…", text: $presenter.taskTitle)
                        .textFieldStyle(.roundedBorder)
                        .padding(.trailing)
                    Button("Add", action: presenter.addTask)
                        .buttonStyle(.borderedProminent)
                }
                .padding()
                
                List {
                    ForEach(presenter.tasks) { task in
                        HStack {
                            Text(task.title)
                            Spacer()
                            Button(task.isDone ? "✓" : "○") {
                                presenter.toggleTask(task.id)
                            }
                        }
                    }
                    .onDelete(perform: presenter.deleteTask)
                }
                .listStyle(.plain)
            }
            .navigationTitle("Tasks")
        }
    }
}

```
  
TaskListPresenter.swift:  
```swift
import Foundation
import Combine

class TaskListPresenter: TaskListPresenterProtocol, ObservableObject {
    @Published var tasks: [Task] = []
    @Published var taskTitle: String = ""
    
    private let interactor: TaskListInteractorProtocol
    private let router: TaskListRouterProtocol
    
    init(interactor: TaskListInteractorProtocol, router: TaskListRouterProtocol) {
        self.interactor = interactor
        self.router = router
        self.tasks = interactor.fetchTasks()
    }
    
    func addTask() {
        guard !taskTitle.isEmpty else { return }
        let task = Task(title: taskTitle)
        interactor.saveTask(task)
        tasks = interactor.fetchTasks()
        taskTitle = ""
    }
    
    func toggleTask(_ id: UUID) {
        guard var task = tasks.first(where: { $0.id == id }) else { return }
        task.isDone.toggle()
        interactor.updateTask(task)
        tasks = interactor.fetchTasks()
    }
    
    func deleteTask(_ indexSet: IndexSet) {
        let tasksToDelete = indexSet.map { tasks[$0] }
        interactor.deleteTasks(tasksToDelete)
        tasks = interactor.fetchTasks()
    }
    
    func didSelectTaskDetails(task: Task) {
        router.navigateToDetails(for: task)
    }
}

```
  
TaskListInteractor.swift:  
```swift
import Foundation

class TaskListInteractor: TaskListInteractorProtocol {
    private var dataStore: [Task] = []
    
    func fetchTasks() -> [Task] {
        return dataStore
    }
    
    func saveTask(_ task: Task) {
        dataStore.append(task)
    }
    
    func updateTask(_ task: Task) {
        if let index = dataStore.firstIndex(where: { $0.id == task.id }) {
            dataStore[index] = task
        }
    }
    
    func deleteTasks(_ tasks: [Task]) {
        for task in tasks {
            if let index = dataStore.firstIndex(where: { $0.id == task.id }) {
                dataStore.remove(at: index)
            }
        }
    }
}

```
  
TaskListRouter.swift:  
```swift
class TaskListRouter: TaskListRouterProtocol {
    func navigateToDetails(for task: Task) {
        print("Navigate to details for \(task.title)")
    }
}

```
  
VIPERApp.swift:  
```swift
import SwiftUI

@main
struct VIPERApp: App {
    var body: some Scene {
        WindowGroup {
            TaskListModule.build()
        }
    }
}

```
  
## Clean Architecture  
  
Clean Architecture is a set of abstract principles defined by Robert C. Martin (Uncle Bob) in his 2012 book. It's not a specific pattern like MVVM or VIPER, nor a prescribed folder structure. So yes, I cheated again… Clean Architecture is rather a philosophy: **organize code in concentric layers where dependencies point inward, and business logic is independent of frameworks, UI, and databases**.  
  
The name reflects the goal: "clean" separation of concerns that makes code maintainable, testable, and framework-agnostic. While specific implementations evolve, the principles remain relevant, and many modern architectures (TCA, RIBs, even well-structured MVVM) incorporate Clean Architecture concepts.  
  
Deriving architectures include **Layered Architecture**, **Hexagonal Architecture** (Ports & Adapters), **Onion Architecture**, and **CQRS** (Command-Query-Responsibility-Segregation). All share the goal of framework-independent business logic. A typical modern architecture for large projects might even use all of them: Clean Architecture for overall structure (layers, dependency rules), Hexagonal principles for implementation (ports/adapters at boundaries), and CQRS for data access (separate read/write models when needed).  
  
### File structure  

Clean Architecture's structure reflects its concentric layers:  
  
* Domain (innermost): Pure business logic; entities, repository interfaces (ports), and use cases. No framework dependencies.  
* Data (middle): Implementation details; repository implementations that conform to domain interfaces. Could swap in CoreData, UserDefaults, or Firebase.  
* Presentation (outer): UI layer; ViewModels and Views that depend on domain use cases.  
  
The `CleanAppFactory.swift` handles dependency injection, wiring concrete implementations to interfaces.  
  
```
Clean/
├── CleanApp.swift
├── CleanAppFactory.swift
├── 1 - Domain/
│   ├── Entities/
│   │   └── Task.swift
│   ├── Interfaces/
│   │   └── TaskRepositories.swift
│   └── UseCases/
│       └── TaskUseCases.swift
├── 2 - Data/
│   └── Repositories/
│       └── InMemoryTaskRepository.swift
└── 3 - Presentation/
    ├── ViewModels/
    │   └── TaskListViewModel.swift
    └── Views/
        └── TaskListView.swift

```
  
### Implementation  
  
TaskRepositories.swift:  
```swift
import Foundation

protocol TaskRepository {
    func getTasks() -> [Task]
    func save(_ task: Task)
    func update(_ task: Task)
    func delete(_ task: Task)
}

```
  
TaskUseCases.swift:  
```swift
import Foundation

struct GetTasksUseCase {
    let repo: TaskRepository
    func execute() -> [Task] {
        return repo.getTasks()
    }
}

struct AddTaskUseCase {
    let repo: TaskRepository
    func execute(title: String) {
        let task = Task(title: title)
        repo.save(task)
    }
}

struct ToggleTaskUseCase {
    let repo: TaskRepository
    func execute(id: UUID) {
        let tasks = repo.getTasks()
        guard var task = tasks.first(where: { $0.id == id }) else { return }
        task.isDone.toggle()
        repo.update(task)
    }
}

struct DeleteTaskUseCase {
    let repo: TaskRepository
    func execute(indexSet: IndexSet) {
        for index in indexSet {
            let tasks = repo.getTasks()
            repo.delete(tasks[index])
        }
    }
}

```
  
InMemoryTaskRepository.swift:  
```swift
import Foundation

class InMemoryTaskRepository: TaskRepository {
    private var tasks: [Task] = []
    
    func getTasks() -> [Task] {
        return tasks
    }
    
    func save(_ task: Task) {
        tasks.append(task)
    }
    
    func update(_ task: Task) {
        if let index = tasks.firstIndex(where: { $0.id == task.id }) {
            tasks[index] = task
        }
    }
    
    func delete(_ task: Task) {
        tasks.removeAll(where: { $0.id == task.id })
    }
}

```
  
TaskListViewModel.swift:  
```swift
import Foundation
import Observation

@Observable
class TaskListViewModel {
    var tasks: [Task] = []
    var taskTitle: String = ""
    
    private let getTasks: GetTasksUseCase
    private let addTask: AddTaskUseCase
    private let toggleTask: ToggleTaskUseCase
    private let deleteTask: DeleteTaskUseCase
    
    init(getTasks: GetTasksUseCase, addTask: AddTaskUseCase, toggleTask: ToggleTaskUseCase, deleteTask: DeleteTaskUseCase) {
        self.getTasks = getTasks
        self.addTask = addTask
        self.toggleTask = toggleTask
        self.deleteTask = deleteTask
        refresh()
    }
    
    func refresh() {
        self.tasks = getTasks.execute()
    }
    
    func performAdd() {
        guard !taskTitle.isEmpty else { return }
        addTask.execute(title: taskTitle)
        taskTitle = ""
        refresh()
    }
    
    func performToggle(_ id: UUID) {
        toggleTask.execute(id: id)
        refresh()
    }
    
    func performDelete(_ indexSet: IndexSet) {
        deleteTask.execute(indexSet: indexSet)
        refresh()
    }
}

```
  
CleanAppFactory.swift:  
```swift
import SwiftUI

struct CleanAppFactory {
    static func makeView() -> some View {
        let repo = InMemoryTaskRepository()
        
        let getUC = GetTasksUseCase(repo: repo)
        let addUC = AddTaskUseCase(repo: repo)
        let toggleUC = ToggleTaskUseCase(repo: repo)
        let deleteUC = DeleteTaskUseCase(repo: repo)
        
        let vm = TaskListViewModel(getTasks: getUC, addTask: addUC, toggleTask: toggleUC, deleteTask: deleteUC)
        
        return TaskListView(viewModel: vm)
    }
}

```

CleanApp.swift:  
```swift
import SwiftUI

@main
struct CleanApp: App {
    var body: some Scene {
        WindowGroup {
            CleanAppFactory.makeView()
        }
    }
}

```
  
## Conclusion  
  
After building the same task manager six times, one truth became clear, and it's quite cliché: there's no universally "best" architecture, only trade-offs that align better or worse with specific needs.  
  
From my experience, the easiest and fastest to implement is MVVM, SwiftUI's sweet spot. For most projects, basic MVVM with `@Observable` gives testability and clean separation without boilerplate overhead. I'd point out how TCA was very interesting, even if it trades speed for safety.
  
On the other side of the coin, MVC and VIPER are fading gracefully. While VIPER taught iOS developers about modularity and testability, its UIKit-centric design feels awkward in SwiftUI.  
  
Finally, Clean Architecture is about principles, not patterns. You don't need five layers and a dozen protocols to write clean code. The core insights (depend on abstractions, separate business logic from frameworks) can be applied within any pattern.  
  
Remember, architecture serves the code, not the other way around. The best architecture is the one that lets your team ship reliable features efficiently. Start simple, measure pain points, and add structure when complexity demands it, not because someone tells you to.  