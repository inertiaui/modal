
use Inertia\Inertia;

// Base page with the ModalLink, and the modal route it opens. baseRoute() ties
// the modal back to the base page so closing returns there.
Route::get('modal-smoke', fn () => Inertia::render('ModalSmoke'))->name('modal-smoke');

Route::get('modal-smoke/greet', fn () => Inertia::modal('Greet', [
    'message' => 'Hello from the Inertia Modal smoke test',
])->baseRoute('modal-smoke'))->name('modal-smoke.greet');
